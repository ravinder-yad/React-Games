import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const counterTone = count > 0 ? "up" : count < 0 ? "down" : "neutral";

  return (
    <main className="app-shell">
      <section className="counter-card">
        <p className="eyebrow">React + useState</p>
        <h1>Counter App</h1>
        <p className="subtitle">State yaad rakhta hai, aur UI turant update hoti hai.</p>

        <p className={`count ${counterTone}`}>{count}</p>

        <div className="controls">
          <button type="button" onClick={() => setCount((current) => current + 1)}>
            Increase
          </button>
          <button type="button" onClick={() => setCount((current) => current - 1)}>
            Decrease
          </button>
          <button type="button" className="reset" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
