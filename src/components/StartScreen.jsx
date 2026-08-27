import {useState} from 'react'
import QuizConsole from "./QuizConsole";


const CATEGORIES = [
  { id: "", label: "Any Category" },
  { id: "18", label: "Science: Computers" },
  { id: "19", label: "Science: Mathematics" },
  { id: "17", label: "Science & Nature" },
  { id: "9", label: "General Knowledge" },
  ]
const DIFICULTIES = [
  { value: "", label: "Any Difficulty" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  ]
  const selectClasses =
  "w-full bg-canvas border border-white/10 rounded-md px-3 py-2 font-mono text-sm text-ink " +
  "focus:outline-none focus:ring-2 focus:ring-keyword/60 focus:border-keyword/60 transition"

function StartScreen({ onStart }) {
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  
  function handleSubmit() {
    onStart(category, difficulty)
  }
  return (
    <QuizConsole path={["quiz", "start.js"]}>
      <p className="font-mono text-xs text-string mb-2">// initialize session</p>
      <h1 className="font-mono text-2xl sm:text-3xl font-bold text-ink mb-3">
        Coding Knowledge Quiz
      </h1>
      <p className="text-muted text-sm leading-relaxed mb-8">
        Test yourself on web dev, data structures, and general programming basics —
        pulled live from a public trivia API.
      </p>
 
      <div className="space-y-4 mb-8">
        <div>
          <label className="block font-mono text-xs text-muted mb-1.5">category</label>
          <select
            className={selectClasses}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
 
        <div>
          <label className="block font-mono text-xs text-muted mb-1.5">difficulty</label>
          <select
            className={selectClasses}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {DIFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>
 
      <button
        onClick={handleSubmit}
        className="w-full bg-keyword hover:bg-keyword/60 active:scale-[0.99] text-canvas font-mono font-semibold text-sm rounded-md py-3 transition"
      >
        Start Quiz
      </button>
    </QuizConsole>
  );
}
 
export default StartScreen;