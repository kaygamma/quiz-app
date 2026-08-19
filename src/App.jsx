import { useState, useReducer } from 'react'
import { quizReducer, initialState } from "./reducer/quizReducer.js"
import questionsData from "./data/questions.json";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import AnswerOptions from "./components/AnswerOptions";
import ProgressBar from "./components/ProgressBar";
import ScoreScreen from "./components/ScoreScreen";

function shuffleArray(array){
  return [...array].sort(()=> Math.random()-0.5);
}

function App(){
  const [state, dispatch] = useReducer(quizReducer, initialState)
  // const [questions, setQuestions] = useState([])
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [score, setScore] = useState(0)
  // const [status, setStatus] = useState("idle")
  // const [selectedAnswer, setSelectedAnswer] = useState(null)
  const {questions, currentIndex, score, status, selectedAnswer} = state
  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  function handleStart() {
    dispatch({ type: "START", payload: shuffleArray(questionsData) })
  }

  function handleAnswer(choice) {
    if (status!=="active") return
    
    dispatch({ type: "ANSWER", payload: choice })
  }

  function handleNext() {
    dispatch({ type: "NEXT" })
  }

  function handleRestart() {
    dispatch({ type: "RESTART" })
  }
  
  return (
    <>
      {status==="idle"&&<StartScreen onStart= {handleStart}/>}
      {(status==="active"|| status==="answered")&& currentQuestion && 
      (
        <>
          <ProgressBar 
            currentIndex={currentIndex} 
            total={totalQuestions}
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
          {status==="answered"&&(
            <button onClick={handleNext}>
             {currentIndex===totalQuestions-1?"See Score": "Next Question"}
            </button>
          )}
        </>
      )}
      {status==="finished" && (
        <ScoreScreen 
          score={score} 
          total={totalQuestions} 
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App
