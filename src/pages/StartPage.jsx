import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
// import questionsData from "../data/questions.json"; hardcoded questions are now fetched from the API in the QuizContext
import StartScreen from "../components/StartScreen";

function StartPage() {
 
  const { dispatch } = useQuiz();
  const navigate = useNavigate();

  function handleStart(category, difficulty) {
    dispatch({ type: "SET_OPTIONS", payload: { category, difficulty } })
    navigate("/quiz")// move to the quiz route after dispatching
  }
  return <StartScreen onStart={handleStart} />
}

export default StartPage;