import React from 'react'

function ScoreScreen({score, total, onRestart}) {
    const percentage = total > 0 ? (score / total) * 100 : 0
    
    let message = "Keep practicing!";
    if (percentage >= 80) message = "Excellent work!"
    else if (percentage >= 50) message = "Good effort!"
    
    return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Your score: {score} out of {total}</p>
      <p>Percentage: {percentage.toFixed(2)}%</p>
      <p>{message}</p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  )
}

export default ScoreScreen
