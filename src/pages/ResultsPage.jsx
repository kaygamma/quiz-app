import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import ScoreScreen from "../components/ScoreScreen"

function ResultsPage() {
  const { state, dispatch } = useQuiz()
  const { score, questions, status } = state
  const navigate = useNavigate()

  // Guard: if someone lands on /results without finishing a quiz
  // (e.g. typed the URL directly), send them home.
  useEffect(() => {
    if (status !== "finished") {
      navigate("/")
    }
  }, [status, navigate])

  function handleRestart() {
    dispatch({ type: "RESTART" })
    navigate("/");
  }

  if (status !== "finished") return null

  return (
    <ScoreScreen score={score} total={questions.length} onRestart={handleRestart} />
  );
}

export default ResultsPage;
