import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const EmojiGuess = () => {
    const levels = [
        { emojis: '🦁👑', answer: 'lion king' },
        { emojis: '🕸️🕷️🧍', answer: 'spiderman' },
        { emojis: '🚢🧊💀', answer: 'titanic' },
        { emojis: '🦇👨', answer: 'batman' },
        { emojis: '👻🚫', answer: 'ghostbusters' },
        { emojis: '🐼🥋', answer: 'kung fu panda' },
        { emojis: '👽🚲🌕', answer: 'et' },
        { emojis: '🦖🏞️', answer: 'jurassic park' },
        { emojis: '🧙‍♂️💍👹', answer: 'lord of the rings' },
        { emojis: '⚡👓🏫', answer: 'harry potter' }
    ];

    const [current, setCurrent] = useState(0);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    const handleGuess = (e) => {
        e.preventDefault();
        if (input.toLowerCase().trim() === levels[current].answer) {
            setMessage('Correct! 🎉');
            setScore(s => s + 10);
            setInput('');
            if (current < levels.length - 1) {
                setTimeout(() => {
                    setCurrent(c => c + 1);
                    setMessage('');
                }, 1000);
            } else {
                setMessage('You completed all levels! 🏆');
            }
        } else {
            setMessage('Wrong, try again! ❌');
        }
    };

    const restart = () => {
        setCurrent(0);
        setScore(0);
        setInput('');
        setMessage('');
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Emoji Guess</h1>
                <p className="game-desc">Guess the movie from Emojis!</p>
            </header>

            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{levels[current].emojis}</h2>
                <p style={{ marginBottom: '2rem', color: '#94a3b8' }}>Level {current + 1} / {levels.length}</p>

                {current < levels.length && (
                    <form onSubmit={handleGuess} style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type movie name..."
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #475569', background: '#0f172a', color: 'white', flex: 1 }}
                        />
                        <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer' }}>
                            Guess
                        </button>
                    </form>
                )}

                <div style={{ height: '30px', fontWeight: 'bold', color: message.includes('Correct') ? '#4ade80' : '#f87171' }}>{message}</div>
            </div>

            <div style={{ marginTop: '2rem', fontWeight: 'bold' }}>Score: {score}</div>

            {message.includes('completed') && (
                <button onClick={restart} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #fff', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>
                    <RotateCcw size={16} /> Replay
                </button>
            )}
        </div>
    );
};

export default EmojiGuess;
