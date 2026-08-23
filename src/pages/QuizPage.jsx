import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import Question from "../components/Question"
import { fetchQuestions } from "../utils/fetchQuestions";
import AnswerOptions from "../components/AnswerOptions"
import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"


function QuizPage() {
  const { state, dispatch } = useQuiz()
  const { questions, currentIndex, status, selectedAnswer, category, difficulty, error } = state
  const navigate = useNavigate()
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  
  const DURATIONS = { easy: 30, medium: 20, hard: 15 };
const duration = DURATIONS[difficulty] ?? 30; // plain calculation, every render

  useEffect(() => {
    if (status === "idle") {
      navigate("/"); // no quiz started — bounce back to start
    } else if (status === "finished") {
      navigate("/results"); // quiz just finished — move to results
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
    if (status !== "active") return // avoid double-firing if already answered
    dispatch({ type: "TIMEOUT" })
  }
  function handleRetry() {
    dispatch({ type: "RETRY" });
  }
 
  // ── RENDER BY STATUS ───────────────────────────────────
  // This is the "loading/error/success" pattern you'll use constantly
  // with any async data fetching in real apps.
 
  if (status === "loading") {
    return <p className="status-message">Loading questions…</p>
  }
 
  if (status === "error") {
    return (
      <div className="status-message">
        <p>Something went wrong: {error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    )
  }

  
  if (!currentQuestion) return null// safety net, e.g. mid-redirect

  return (
    <>
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
        <button onClick={handleNext}>
          {currentIndex === totalQuestions - 1 ? "See Score" : "Next Question"}
        </button>
      )}
    </>
  );
}

export default QuizPage;
