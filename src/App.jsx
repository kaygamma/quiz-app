import { useState } from 'react'
import questionsData from "./data/questions.json";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import AnswerOptions from "./components/AnswerOptions";
import ProgressBar from "./components/ProgressBar";
import ScoreScreen from "./components/ScoreScreen";

function shuffleArray(array){
  return [...array].sort(()=> Math.random()-0.5);
}

function App() {

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState("idle")
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const [currentquestion, setCurrentQuestion] = useState(currentIndex)
  const totalQuestions = questions.length

  function handleStart() {
    setQuestions(shuffleArray(questionsData))
    console.log(questions)
    setCurrentIndex(0) 
    setScore(0)
    setStatus("active")
    setSelectedAnswer(null)
  }

  function handleAnswer(choice) {
    if (status!=="active") return
    
    setSelectedAnswer(choice)

    if (choice === currentquestion.correct_answer){
      setScore((prevScore) => prevScore + 1)
    }
    setStatus = ("answered")
  }

  function handleNext() {
    const islastQuestion = currentIndex === totalQuestions -1
    if(islastQuestion){
      setStatus("finished")
    }else{
      setCurrentIndex((prevIndex)=> prevIndex + 1)
      setSelectedAnswer(null)
      setStatus("active")
    }
  }

  function handleRestart() {
    setStatus("idle")
  }
  
  return (
    <>
      {status==="idle"&&<StartScreen onStart= {handleStart}/>}
      {(status==="active"|| status==="answered")&& currentquestion && 
      (
        <>
          <ProgressBar 
            currentIndex={currentIndex} 
            total={totalQuestions}
          />

          <Question
            question={currentquestion}
            currentIndex={currentIndex}
            total={totalQuestions}
          />
          <AnswerOptions
            question={currentquestion}
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
  )
}

export default App
