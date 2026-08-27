function ScoreScreen({score, total, onRestart}) {
    const percent = total > 0 ? Math.round((score / total) * 100) : 0

    let message = "// Keep practicing";
    if (percent >= 80) message = "// excellent work!"
    else if (percent >= 50) message = "// good effort!"
    
    return (
    <div>
      <h2 className="font-mono text-xs text-string mb-2">// Quiz Completed!</h2>
      <h2 className="font-mono text-2xl font-bold text-ink mb-1">Result</h2>
      <p className="font-mono text-sm text-muted mb-6">{message}</p>

      <div className="font-mono flex items-baseline gap-2 mb-8"
      >
        <span className="text-5xl font-bold text-keyword">{score}</span>
        <span className="text-xl text-muted">/{total}</span>
        <span className="text-sm text-muted ml-auto">{percent.toFixed(2)}%</span>
      </div>
      
      <button 
        onClick={onRestart}
        className="w-full bg-keyword hover:bg-keyword/90 active:scale-[0.99] text-canvas font-mono font-semibold text-sm rounded-md py-3 transition"
      >
        Restart Quiz</button>
    </div>
  )
}
export default ScoreScreen