// This is the signature wrapper used on every screen — it makes the whole
// app feel like a single file open in a code editor, with a breadcrumb
// path that changes to reflect where the user actually is.
//
// `path` is an array of strings, e.g. ["quiz", "science-computers", "hard", "question-03"]
// rendered like a file path: quiz / science-computers / hard / question-03

function QuizConsole({ path, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Fake editor tab bar */}
        <div className="flex items-center gap-2 bg-panel/60 rounded-t-lg px-4 py-2 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-fail/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-string/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-pass/70" />
          <span className="ml-3 font-mono text-xs text-muted truncate">
            {path.join(" / ")}
          </span>
        </div>

        {/* Main panel */}
        <div className="bg-panel rounded-b-lg shadow-2xl shadow-black/40 px-6 py-8 sm:px-10 sm:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default QuizConsole;