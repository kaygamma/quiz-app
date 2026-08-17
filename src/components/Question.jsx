import React from 'react'

function Question({question, currentIndex, totalQuestions}) {
  return (
    <div>
      <h2>Question {currentIndex + 1} / {totalQuestions}</h2>
      <p>{question.question}</p>
    </div>
  )
}

export default Question
