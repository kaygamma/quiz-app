import React from 'react'

function StartScreen({ onStart }) {
  return (
    <div>
      <h1>Coding Knowledge Quiz</h1>
      <p>
        Test yourself on web dev, data structures, and general programming basics
      </p>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  )
}

export default StartScreen
