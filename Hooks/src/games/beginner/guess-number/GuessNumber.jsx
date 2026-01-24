import React, { useState } from 'react';
import { RotateCcw, Monitor } from 'lucide-react';

const GuessNumber = () => {
    const [target, setTarget] = useState(generateNumber());
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('Guess a number between 1 and 100');
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    function generateNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    const handleGuess = (e) => {
        e.preventDefault();
        const num = parseInt(guess);
        if (isNaN(num)) return;

        setAttempts(a => a + 1);

        if (num === target) {
            setMessage(`🎉 Correct! The number was ${target}.`);
            setGameOver(true);
        } else if (num < target) {
            setMessage('📉 Too Low! Try higher.');
        } else {
            setMessage('📈 Too High! Try lower.');
        }
        setGuess('');
    };

    const resetGame = () => {
        setTarget(generateNumber());
        setGuess('');
        setMessage('Guess a number between 1 and 100');
        setAttempts(0);
        setGameOver(false);
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center', maxWidth: '500px' }}>
            <header className="game-header">
                <h1 className="game-title">Guess The Number</h1>
                <p className="game-desc">I'm thinking of a number between 1-100.</p>
            </header>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '1.5rem', minHeight: '3rem', color: gameOver ? '#4ade80' : '#fff' }}>
                    {message}
                </div>

                <div style={{ marginBottom: '1rem', color: '#94a3b8' }}>Attempts: {attempts}</div>

                {!gameOver && (
                    <form onSubmit={handleGuess} style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <input
                            type="number"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            placeholder="Enter number..."
                            style={{
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #334155',
                                background: '#0f172a',
                                color: 'white',
                                fontSize: '1.2rem',
                                width: '150px',
                                textAlign: 'center'
                            }}
                            autoFocus
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Guess
                        </button>
                    </form>
                )}
            </div>

            <button onClick={resetGame} style={{
                background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
            }}>
                <RotateCcw size={16} /> New Game
            </button>
        </div>
    );
};

export default GuessNumber;
