import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import questionsData from "../data/questions.json";
import StartScreen from "../components/StartScreen";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function StartPage() {
 
  const { dispatch } = useQuiz();
  const navigate = useNavigate();

  function handleStart() {
    dispatch({ type: "START", payload: shuffleArray(questionsData) });
    navigate("/quiz"); // move to the quiz route after dispatching
  }
  return <StartScreen onStart={handleStart} />;
}

export default StartPage;
