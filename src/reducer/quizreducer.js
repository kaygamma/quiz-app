export function quizReducer(state, action) {
    switch (action.type) {
        case "START": {
            return{
                ...state,
                questions: action.payload,
                currentIndex: 0,
                score: 0,
                status: "active",
                selectedAnswer: null
            }
        }
        case "SET_OPTIONS": {
            return{
                ...state,
                category: action.payload.category,
                difficulty: action.payload.difficulty,
                status: "loading",
                error: null,
            }
        }
        case "FETCH_SUCCESS": {
            return{
                ...state,
                questions: action.payload,
                currentIndex: 0,
                score: 0,
                status: "active",
                selectedAnswer: null
            }
        }
        case "FETCH_ERROR": {
            return{
                ...state,
                status: "error",
                error: action.payload,
            }
        }
        case "RETRY": {
            return{
                ...state,
                status: "loading",
                error: null,
            }
        }
        case "ANSWER": {
            const currentQuestion = state.questions[state.currentIndex]
            const isCorrect = action.payload === currentQuestion.correct_answer
            return{
                ...state,
                selectedAnswer: action.payload,
                score: isCorrect ? state.score + 1 : state.score,
                status: "answered"
            }
        }
        case "TIMEOUT": {
            return{
                ...state,
                selectedAnswer: null,
                status: "answered"
            }
        }
        case "NEXT": {
            const isLastQuestion = state.currentIndex === state.questions.length - 1
            if (isLastQuestion) {
                return {
                    ...state,
                    status: "finished"
                }
            }
            return{
                ...state,
                currentIndex: isLastQuestion ? state.currentIndex : state.currentIndex + 1,
                selectedAnswer: null,
                status: isLastQuestion ? "finished" : "active"
            }
        }
        case "RESTART": {
            return{
                ...state,
                questions: [],
                currentIndex: 0,
                score: 0,
                status: "idle",
                selectedAnswer: null
            }
        }
        default: {
           throw new Error(`Unknown action type: ${action.type}`) 
        }
            

    }   
}
export const initialState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  status: "idle",
  selectedAnswer: null,
};