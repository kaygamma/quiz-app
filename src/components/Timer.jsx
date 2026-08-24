import { useState, useEffect } from "react";

function Timer({ duration, onTimeUp, resetKey, isRunning }) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const percent = (timeLeft / duration) * 100

  useEffect(() => {
    setTimeLeft(duration)
  }, [resetKey, duration])

  useEffect(() => {
    if (!isRunning) return
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isRunning, onTimeUp]);

  return (
    <div className="timer">
        <div>
            <div style={{ width: `${percent}%`, backgroundColor: 'red', height: '5px' }} />
        </div>
      <span>{timeLeft}s</span>
    </div>
  );
}
export default Timer