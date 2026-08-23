import {useState} from 'react'

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
function StartScreen({ onStart }) {
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  
  function handleSubmit() {
    onStart(category, difficulty)
  }
  return (
    <div>
      <h1>Coding Knowledge Quiz</h1>
      <p>
        Test yourself on web dev, data structures, and general programming basics
      </p>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {DIFICULTIES.map((diff) => (
            <option key={diff.value} value={diff.value}>
              {diff.label}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleSubmit}>Start Quiz</button>
    </div>
  )
}

export default StartScreen
