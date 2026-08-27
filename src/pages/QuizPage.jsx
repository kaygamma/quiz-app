import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import Question from "../components/Question"
import { fetchQuestions } from "../utils/fetchQuestions";
import AnswerOptions from "../components/AnswerOptions"
import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"
import QuizConsole from "../components/QuizConsole"



function QuizPage() {
  const { state, dispatch } = useQuiz()
  const { questions, currentIndex, status, selectedAnswer, category, difficulty, error } = state
  const navigate = useNavigate()
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length
  
  const DURATIONS = { easy: 30, medium: 20, hard: 15 };
  const duration = DURATIONS[difficulty] ?? 30

  useEffect(() => {
    if (status === "idle") {
      navigate("/")
    } else if (status === "finished") {
      navigate("/results")
    }
  }, [status, navigate])

  useEffect(() => {
    if (status !== "loading") return;

    let cancelled = false;
 
    async function loadQuestions() {
      try {
        const data = await fetchQuestions({ amount: 10, category, difficulty });
        if (!cancelled) {
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        }
      } catch (err) {
        if (!cancelled) {
          dispatch({ type: "FETCH_ERROR", payload: err.message });
        }
      }
    }
 
    loadQuestions();
 
    return () => {
      cancelled = true;
    };
  }, [status, category, difficulty, dispatch])

  function handleAnswer(choice) {
    if (status !== "active") return
    dispatch({ type: "ANSWER", payload: choice })
  }

  function handleNext() {
    dispatch({ type: "NEXT" })
  }

  function handleTimeUp() {
    if (status !== "active") return 
    dispatch({ type: "TIMEOUT" })
  }
  function handleRetry() {
    dispatch({ type: "RETRY" });
  }
   // Build the breadcrumb path shown in the console header — this is the
  // signature element, so it should reflect real state, not be static.
  const breadcrumbPath = [
    "quiz",
    category ? `category-${category}` : "any-category",
    difficulty || "any-difficulty",
    currentQuestion ? `question-${String(currentIndex + 1).padStart(2, "0")}.js` : "loading.js",
  ];
 
  if (status === "loading") {
    return(
      <QuizConsole path={["quiz", "loading.js"]}>
        <div className="flex items-center justify-center mb-6">
          <svg className="mr-3 size-5 animate-spin text-string" viewBox="0 0 24 24">
            {/* spinner path here */}
          </svg>
          <p className="font-mono text-sm text-muted animate-pulse">
            // fetching questions…
          </p>
        </div>
    </QuizConsole> 
    ) 
       
  }
 
  if (status === "error") {
    return (
      <QuizConsole path={["quiz", "error.js"]}>
        <p className="font-mono text-sm text-fail mb-2">
          // request failed</p>
        <p className="text-sm text-ink mb-6">Something went wrong: {error}</p>
        <button 
          onClick={handleRetry}
          className="w-full bg-fail/10 border border-fail/40 hover:bg-fail/20 text-fail font-mono text-sm rounded-md py-3 transition"
        >
          Retry
        </button>
      </QuizConsole>
    )
  }

  
  if (!currentQuestion) return null

  return (
    <QuizConsole path={breadcrumbPath}>
      <ProgressBar 
        currentIndex={currentIndex}  
        totalQuestions={totalQuestions} 
      />

      <Timer
        duration={duration}
        resetKey={currentIndex}
        isRunning={status === "active"}
        onTimeUp={handleTimeUp}
      />

      <Question
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
      />

      <AnswerOptions
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        status={status}
        onAnswer={handleAnswer}
      />

      {status === "answered" && (
        <button onClick={handleNext}
          className="w-full bg-keyword hover:bg-keyword/90 active:scale-[0.99] text-canvas font-mono font-semibold text-sm rounded-md py-3 transition">
          {currentIndex === totalQuestions - 1 ? "See Score" : "Next Question"}
        </button>
      )}
    </QuizConsole>
  );
}

export default QuizPage;
