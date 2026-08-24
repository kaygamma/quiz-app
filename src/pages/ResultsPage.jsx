import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import ScoreScreen from "../components/ScoreScreen"

const STORAGE_KEY = "quiz-App-State"

function ResultsPage() {
  const { state, dispatch } = useQuiz()
  const { score, questions, status } = state
  const navigate = useNavigate()

  // Local state just for displaying the best score — doesn't need to be in the reducer
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    if (status !== "finished") {
      navigate("/")
      return
    }
  
    const stored = Number(localStorage.getItem(STORAGE_KEY)) || 0;
 
    if (score > stored) {
      localStorage.setItem(STORAGE_KEY, String(score));
      setBestScore(score);
    } else {
      setBestScore(stored);
    }
  }, [status])

  function handleRestart() {
    dispatch({ type: "RESTART" })
    navigate("/");
  }

  if (status !== "finished") return null

  return (
    <>
      <ScoreScreen score={score} total={questions.length} onRestart={handleRestart} />
      <p className="text-lg font-bold">Best Score so far: {bestScore} / {questions.length}</p>
    </>
  );
}

export default ResultsPage;
