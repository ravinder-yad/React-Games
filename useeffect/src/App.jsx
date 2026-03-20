import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setCount((currentCount) => currentCount + 1);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isRunning]);

  useEffect(() => {
    document.title = `Auto Count: ${count}`;
  }, [count]);

  return (
    <main className="app-shell">
      <section className="effect-card">
        <p className="tag">useEffect Project</p>
        <h1>Auto Counter</h1>
        <p className="description">
          `useEffect` interval start karta hai, cleanup timer band karta hai.
        </p>

        <p className="count">{count}</p>
        <p className="status">{isRunning ? "Status: Running" : "Status: Paused"}</p>

        <div className="controls">
          <button type="button" onClick={() => setIsRunning((current) => !current)}>
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button type="button" onClick={() => setCount((current) => current + 1)}>
            +1
          </button>
          <button
            type="button"
            className="reset"
            onClick={() => {
              setCount(0);
              setIsRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
