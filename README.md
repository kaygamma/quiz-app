# Coding Knowledge Quiz

A React quiz app that pulls live trivia questions from the Open Trivia DB API, with configurable category/difficulty, a per-question timer, and persistent high scores.

**[Live Demo](#)** · **[Repo](https://github.com/kaygamma/quiz-app)**

<!-- Replace the Live Demo link once deployed, and drop a screenshot or GIF below -->
<!-- ![Quiz app screenshot](./screenshot.png)... PENDING -->

## Features

- Pick a category and difficulty before starting — questions and timer duration adjust accordingly
- Live questions fetched from [Open Trivia DB](https://opentdb.com/), not hardcoded
- Per-question countdown timer; running out of time auto-reveals the answer and moves on
- Loading and error states with a working Retry button (handles network failures and API errors gracefully)
- Best score persisted across sessions via `localStorage`
- Client-side routing: separate `/`, `/quiz`, and `/results` screens, with guards against jumping to `/quiz` or `/results` directly without an active/finished quiz

## Tech Stack

- **React** (Vite)
- **React Router** — route-based screens
- **useReducer** — centralized quiz state transitions (start, answer, timeout, next, restart, fetch lifecycle)
- **useContext** — quiz state/dispatch shared across routes without prop drilling
- **useEffect** — data fetching, timer countdown with cleanup, route guards
- **Open Trivia DB API** — live question data
- **localStorage** — persisted best score

## What I Learned

This was my first full React project, built as a structured progression rather than all at once:

1. **Started with `useState`** for a basic MVP — hardcoded questions, working quiz flow, no styling.
2. **Refactored to `useReducer`** once multiple related pieces of state (score, status, selected answer) needed to change together in response to a single event — centralizing that logic in one reducer made the state transitions predictable and easy to reason about.
3. **Added `useContext` and React Router** to split the app into real routes without prop-drilling state through every component.
4. **Replaced hardcoded data with a live API**, which meant handling real-world async concerns: loading states, error states with retry, and race conditions from effects re-running (e.g. cancelling stale fetches on unmount).
5. **Debugged a range of real bugs along the way** — falsy-value rendering (`0 && <Component/>`), assignment vs. invocation (`setStatus = (...)` vs `setStatus(...)`), prop-name mismatches between components, and infinite render loops from calling a state setter directly in the render body instead of inside `useEffect`.

## Possible Next Steps

- Full CSS pass / responsive design
- Accessibility pass (keyboard nav, ARIA labels)
- Deploy to Vercel/Netlify

## Project Structure
```
src/
├── components/     # Presentational components (StartScreen, Question, AnswerOptions, ProgressBar, ScoreScreen, Timer)
├── context/        # QuizContext — provides state/dispatch app-wide
├── pages/          # Route-level components (StartPage, QuizPage, ResultsPage)
├── reducer/        # quizReducer — all state transition logic in one place
├── utils/          # fetchQuestions — API call, error handling, response shaping
├── App.jsx         # Route definitions
└── main.jsx        # Router + Context providers
```

