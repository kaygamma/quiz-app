import React, { useMemo } from 'react'

function AnswerOptions({ question, selectedAnswer, status, onAnswer }) {
    const options = useMemo(() => {
        const all = [...question.incorrect_answers, question.correct_answer]
        return [...all].sort(() => Math.random() - 0.5)
    }, [question])

  return (
    <div>
      {options.map((option) => {
        let buttonClass = "option-button"
        if ( status === "answered") {
            if (option === question.correct_answer) {
                buttonClass += " correct"
            } else if (option === selectedAnswer) {
                buttonClass += " incorrect"
            } else {
                buttonClass += " disabled"
            }
            
        }
        return (
            <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={status === "answered"}
            className={buttonClass}
            >
             {option}
            </button>
        ) 
    })}
    </div>
  )
}
export default AnswerOptions