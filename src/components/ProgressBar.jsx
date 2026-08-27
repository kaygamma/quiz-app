function ProgressBar({ currentIndex, totalQuestions }) {
    const percent = totalQuestions > 0 ? (currentIndex / totalQuestions ) * 100 : 0
  return (
    <div className="w-full bg-canvas rounded-full overflow-hidden mb-6">
      <div 
      className="h-full bg-linear-to-r from-keyword to-string transition-all duration-300 ease-out" 
      style={{ width: `${percent}%`, height: '20px' }} />
    </div>
  )
}

export default ProgressBar