import { createContext, useContext, useMemo, useState } from "react";
import "./App.css";

const ThemeContext = createContext("sunrise");
const UserContext = createContext(null);

function Toolbar() {
  const theme = useContext(ThemeContext);

  return (
    <section className={`panel ${theme}`}>
      <h2>Toolbar</h2>
      <p>Yeh component direct prop ke bina theme context read kar raha hai.</p>
      <ThemeBadge />
    </section>
  );
}

function ThemeBadge() {
  const theme = useContext(ThemeContext);
  return <p className="badge">Theme: {theme}</p>;
}

function ProfileCard() {
  const { user, setUser } = useContext(UserContext);

  return (
    <section className="panel">
      <h2>User Card</h2>
      <p>Current User: {user}</p>
      <div className="actions">
        <button type="button" onClick={() => setUser("Acer")}>
          Set Acer
        </button>
        <button type="button" onClick={() => setUser("React Learner")}>
          Set Learner
        </button>
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState("sunrise");
  const [user, setUser] = useState("Guest");

  const userValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={userValue}>
        <main className="app-shell">
          <section className="context-card">
            <p className="tag">React + useContext</p>
            <h1>Context Demo</h1>
            <p className="subtitle">
              Parent se data pass kiye bina child components tak value share hoti hai.
            </p>

            <div className="actions">
              <button
                type="button"
                onClick={() =>
                  setTheme((current) => (current === "sunrise" ? "midnight" : "sunrise"))
                }
              >
                Toggle Theme
              </button>
            </div>

            <div className="grid">
              <Toolbar />
              <ProfileCard />
            </div>
          </section>
        </main>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
