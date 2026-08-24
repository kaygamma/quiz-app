function ProgressBar({ currentIndex, totalQuestions }) {
    const percent = totalQuestions > 0 ? (currentIndex / totalQuestions ) * 100 : 0
  return (
    <div>
      <div style={{ width: `${percent}%`, backgroundColor: 'blue', height: '20px' }} />
    </div>
  )
}

export default ProgressBar