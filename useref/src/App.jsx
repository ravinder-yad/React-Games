import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const intervalRef = useRef(null);
  const lastSavedRef = useRef("");

  const [note, setNote] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [saveCount, setSaveCount] = useState(0);

  const isRunning = intervalRef.current !== null;

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const startTimer = () => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) {
      return;
    }

    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  const saveWithRef = () => {
    lastSavedRef.current = note || "Empty note";
    setSaveCount((current) => current + 1);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="card">
        <p className="tag">React + useRef</p>
        <h1>Focus + Stopwatch</h1>
        <p className="subtitle">
          `useRef` se DOM element access aur mutable value hold karte hain without extra re-render.
        </p>

        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Type a note"
          />
          <button type="button" onClick={focusInput}>
            Focus Input
          </button>
          <button type="button" onClick={saveWithRef}>
            Save in Ref
          </button>
        </div>

        <p className="saved">
          Last saved (ref): <strong>{lastSavedRef.current || "Nothing yet"}</strong>
        </p>
        <p className="saved-count">Saved count: {saveCount}</p>

        <div className="timer">
          <p className="time">{seconds}s</p>
          <p className="status">{isRunning ? "Running" : "Stopped"}</p>
          <div className="controls">
            <button type="button" onClick={startTimer}>
              Start
            </button>
            <button type="button" onClick={stopTimer}>
              Stop
            </button>
            <button type="button" className="reset" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
