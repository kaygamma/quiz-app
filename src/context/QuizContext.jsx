import { createContext, useContext, useReducer } from "react"
import { initialState, quizReducer } from "../reducer/quizreducer";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const value = { state, dispatch }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const context = useContext(QuizContext)

  if (context === null) {
    throw new Error("useQuiz must be used inside a <QuizProvider>")
  }
  return context
}