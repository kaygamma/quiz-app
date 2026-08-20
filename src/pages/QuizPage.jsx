import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import Question from "../components/Question"
import AnswerOptions from "../components/AnswerOptions"
import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"

const QUESTION_DURATION = 15 // seconds per question

function QuizPage() {
  const { state, dispatch } = useQuiz()
  const { questions, currentIndex, status, selectedAnswer } = state
  const navigate = useNavigate()
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (status === "idle") {
      navigate("/"); // no quiz started — bounce back to start
    } else if (status === "finished") {
      navigate("/results"); // quiz just finished — move to results
    }
  }, [status, navigate]);

  function handleAnswer(choice) {
    if (status !== "active") return
    dispatch({ type: "ANSWER", payload: choice })
  }

  function handleNext() {
    dispatch({ type: "NEXT" })
  }

  function handleTimeUp() {
    if (status !== "active") return // avoid double-firing if already answered
    dispatch({ type: "TIMEOUT" })
  }

  // While the useEffect above is busy redirecting (or if there's simply
  // no current question yet), render nothing rather than crashing on
  // `currentQuestion.question` when currentQuestion is undefined.
  if (!currentQuestion) return null

  return (
    <>
      <ProgressBar 
        currentIndex={currentIndex}  
        totalQuestions={totalQuestions} 
      />

      <Timer
        duration={QUESTION_DURATION}
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
        <button onClick={handleNext}>
          {currentIndex === totalQuestions - 1 ? "See Score" : "Next Question"}
        </button>
      )}
    </>
  );
}

export default QuizPage;
