// This function is deliberately kept OUTSIDE any component. It's a plain
// async function — no hooks, no JSX. That makes it easy to reuse and easy
// to test on its own later if you ever add tests.

// Open Trivia DB returns HTML-encoded text, e.g. "Which of these &amp; that"
// instead of "Which of these & that". This helper decodes it using a trick:
// let the browser's own HTML parser do the decoding for us via a <textarea>.
function decodeHTML(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

// response_code meanings from the Open Trivia DB docs:
// 0 = success, 1 = no results, 2 = invalid parameter,
// 3 = token not found, 4 = token empty
const RESPONSE_CODE_MESSAGES = {
  1: "Not enough questions available for that category/difficulty combo. Try a different selection.",
  2: "Invalid request — check the category or difficulty settings.",
  3: "Session token not found.",
  4: "Session token empty — no more questions left for this session.",
};

export async function fetchQuestions({ amount = 10, category, difficulty }) {
  const params = new URLSearchParams({
    amount: String(amount),
    type: "multiple",
  });

  if (category) params.set("category", category);
  if (difficulty) params.set("difficulty", difficulty);

  const url = `https://opentdb.com/api.php?${params.toString()}`
  // console.log("Fetching questions from:", url)

  let response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    // fetch() itself throws on network failure (no internet, DNS failure, etc.)
    // — NOT on HTTP error codes like 404/500, that's a separate check below.
    throw new Error("Network error — check your internet connection and try again.");
  }

  if (!response.ok) {
    // e.g. 500 Internal Server Error from the API itself
    throw new Error(`Server error (${response.status}). Please try again.`);
  }

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error(RESPONSE_CODE_MESSAGES[data.response_code] || "Unknown error fetching questions.");
  }

  // Reshape the API's data into EXACTLY the same shape as our old
  // questions.json — this is why nothing downstream (Question,
  // AnswerOptions) needs to change at all.
  return data.results.map((item, index) => ({
    id: index,
    question: decodeHTML(item.question),
    correct_answer: decodeHTML(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map(decodeHTML),
  }));
}