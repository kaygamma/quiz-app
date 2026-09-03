import { useMemo } from "react";

function AnswerOptions({ question, selectedAnswer, status, onAnswer }) {
  const options = useMemo(() => {
    const all = [question.correct_answer, ...question.incorrect_answers];
    return [...all].sort(() => Math.random() - 0.5);
  }, [question]);

  return (
    <div className="space-y-2 mb-6">
      {options.map((option) => {
        const isCorrect = option === question.correct_answer;
        const isSelected = option === selectedAnswer;
        const revealed = status === "answered";

        // Base classes every option shares
        let classes =
          "w-full flex items-center justify-between gap-3 text-left font-mono text-sm " +
          "rounded-md border px-4 py-3 transition ";

        if (!revealed) {
          classes +=
            "bg-canvas border-white/10 text-ink hover:border-keyword/60 hover:bg-keyword/5 cursor-pointer";
        } else if (isCorrect) {
          classes += "bg-pass/10 border-pass/60 text-pass";
        } else if (isSelected) {
          classes += "bg-fail/10 border-fail/60 text-fail";
        } else {
          classes += "bg-canvas border-white/5 text-muted opacity-50";
        }

        return (
          <button
            key={option}
            className={classes}
            disabled={revealed}
            onClick={() => onAnswer(option)}
          >
            <span className="flex items-center gap-3">
              <span className="text-muted"
              >
                {revealed && isCorrect ? "[✓]" : revealed && isSelected ? "[x]" : "[ ]"}
              </span>
              <span>{option}</span>
            </span>

            {/* Terminal-style pass/fail readout — the signature feedback moment */}
            {revealed && isCorrect && <span className="text-xs font-semibold">✓ PASS</span>}
            {revealed && isSelected && !isCorrect && <span className="text-xs font-semibold">✗ FAIL</span>}
          </button>
        );
      })}
    </div>
  );
}

export default AnswerOptions;