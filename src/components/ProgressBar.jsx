import React from 'react'

function ProgressBar({ currentIndex, total }) {
    const percent = total > 0 ? (currentIndex / total ) * 100 : 0
  return (
    <div>
      <div style={{ width: `${percent}%`, backgroundColor: 'blue', height: '20px' }} />
    </div>
  )
}

export default ProgressBar
