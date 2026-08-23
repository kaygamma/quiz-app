// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QuizProvider } from "./context/QuizContext.jsx"
import App from "./App.jsx"

// Order matters here, from outside in:
// BrowserRouter  -> enables routing anywhere in the app
// QuizProvider   -> makes quiz state/dispatch available anywhere in the app
// App            -> your actual route definitions live here now

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <QuizProvider>
        <App />
      </QuizProvider>
    </BrowserRouter>
  </>
)
