import React, { useState, useEffect } from 'react';

const MathQuiz = () => {
    const [problem, setProblem] = useState({ q: '', a: 0 });
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);

    const generateProblem = () => {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        const n1 = Math.floor(Math.random() * 20) + 1;
        const n2 = Math.floor(Math.random() * 20) + 1;

        let q = `${n1} ${op} ${n2}`;
        let a;
        // eslint-disable-next-line no-eval
        if (op === '+') a = n1 + n2;
        if (op === '-') a = n1 - n2;
        if (op === '*') a = n1 * n2;

        setProblem({ q, a });
    };

    useEffect(() => {
        let interval;
        if (isPlaying && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        } else if (timer === 0) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timer]);

    const startGame = () => {
        setScore(0);
        setTimer(30);
        setIsPlaying(true);
        setInput('');
        generateProblem();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isPlaying) return;

        if (parseInt(input) === problem.a) {
            setScore(s => s + 10);
            generateProblem();
            setInput('');
        } else {
            // Penalty or shake effect could go here
            setInput('');
        }
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Math Quiz</h1>
                <p className="game-desc">Solve as many as you can in 30s.</p>
            </header>

            {!isPlaying ? (
                <div className="glass-panel" style={{ padding: '3rem', maxWidth: '400px', margin: '0 auto' }}>
                    {timer === 0 && <h2 style={{ marginBottom: '1rem', color: '#4ade80' }}>Time's Up! Score: {score}</h2>}
                    <button onClick={startGame} style={{ padding: '1rem 2rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', cursor: 'pointer' }}>
                        Start Quiz
                    </button>
                </div>
            ) : (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem' }}>
                        <span>Time: {timer}s</span>
                        <span>Score: {score}</span>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>{problem.q} = ?</div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoFocus
                                style={{
                                    fontSize: '2rem', padding: '0.5rem', width: '150px',
                                    textAlign: 'center', borderRadius: '8px',
                                    background: '#1e293b', border: '1px solid #475569', color: 'white',
                                    marginBottom: '1rem'
                                }}
                            />
                            <button type="submit" style={{ display: 'block', width: '100%', padding: '1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', cursor: 'pointer' }}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MathQuiz;
