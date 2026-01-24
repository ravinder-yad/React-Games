import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "React makes it painless to create interactive UIs.",
    "Hooks let you use state and other React features without writing a class.",
    "Components build complex UIs from small isolated pieces of code.",
    "Virtual DOM improves performance by minimizing real DOM updates."
];

const TypingSpeed = () => {
    const [text, setText] = useState(sentences[0]);
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [completed, setCompleted] = useState(false);

    // Calculate WPM
    useEffect(() => {
        if (completed && startTime) {
            const endTime = Date.now();
            const timeInMinutes = (endTime - startTime) / 60000;
            const words = text.split(' ').length;
            setWpm(Math.round(words / timeInMinutes));
        }
    }, [completed, startTime, text]);

    const handleChange = (e) => {
        const val = e.target.value;
        if (!startTime) setStartTime(Date.now());
        setInput(val);

        if (val === text) {
            setCompleted(true);
        }
    };

    const reset = () => {
        setText(sentences[Math.floor(Math.random() * sentences.length)]);
        setInput('');
        setStartTime(null);
        setWpm(0);
        setCompleted(false);
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Typing Speed</h1>
                <p className="game-desc">Type the sentence as fast as you can!</p>
            </header>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'left', borderRadius: '12px' }}>
                {text.split('').map((char, i) => {
                    let color = '#94a3b8';
                    if (i < input.length) {
                        color = input[i] === char ? '#4ade80' : '#f87171';
                    }
                    return <span key={i} style={{ color }}>{char}</span>;
                })}
            </div>

            <textarea
                value={input}
                onChange={handleChange}
                disabled={completed}
                placeholder="Start typing here..."
                style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.2rem',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    background: '#0f172a',
                    color: 'white',
                    minHeight: '100px',
                    marginBottom: '1rem'
                }}
                autoFocus
            />

            {completed && (
                <div className="fade-in">
                    <h2 style={{ fontSize: '2rem', color: '#38bdf8', marginBottom: '1rem' }}>Result: {wpm} WPM</h2>
                    <button onClick={reset} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <RotateCcw size={18} /> Try Another
                    </button>
                </div>
            )}
        </div>
    );
};

export default TypingSpeed;
