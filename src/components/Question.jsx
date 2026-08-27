function Question({question, currentIndex, totalQuestions}) {
  return (
    <div className="mb-6">
      <p className="font-mono text-xs text-string mb-2">
        // Question {currentIndex + 1} / {totalQuestions}
      </p>
      <h2 className="font-mono text-lg font-semibold text-ink leading-snug">
        {question.question}
      </h2>
    </div>
  )
}

export default Question
