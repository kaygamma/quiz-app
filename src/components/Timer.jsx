import { useState, useEffect } from "react";

function Timer({ duration, onTimeUp, resetKey, isRunning }) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const percent = (timeLeft / duration) * 100
  const isLow = percent < 30

  useEffect(() => {
    setTimeLeft(duration)
  
    if (!isRunning) return
    
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ onTimeUp]);
  
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-1.5 bg-canvas rounded-full overflow-hidden" >
        <div
          style={{ width: `${percent}%`}}
          className={`h-full transition-all duration-1000 ease-linear ${isLow ? 'bg-fail' : 'bg-linear-to-r from-fail to-pass'} `} 
        />
      </div>
      
      <span
        className={`font-mono text-xs px-2 py-1 rounded shrink-0
        ${
          isLow ? "text-fail bg-fail/10" : "text-string bg-string/10"
        }`}
      >
        {String(timeLeft).padStart(2, "0")}s
      </span>
    </div>
  );
}
export default Timer