import React, { useState, useEffect } from 'react';
import { MousePointer, Timer } from 'lucide-react';

const ButtonSmash = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(10);
        setIsPlaying(true);
    };

    const smash = () => {
        if (isPlaying) setScore(s => s + 1);
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Button Smash</h1>
                <p className="game-desc">How fast can you click in 10 seconds?</p>
            </header>

            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '3rem', fontSize: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Timer color="#facc15" /> {timeLeft}s
                </div>
                <div>Score: {score}</div>
            </div>

            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!isPlaying && timeLeft === 0 ? (
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#4ade80' }}>Time's Up! Score: {score}</h2>
                        <button onClick={startGame} style={{ padding: '1rem 2rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                            Try Again
                        </button>
                    </div>
                ) : !isPlaying ? (
                    <button onClick={startGame} style={{ padding: '1rem 2rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem' }}>
                        Start Smashing
                    </button>
                ) : (
                    <button
                        onClick={smash}
                        style={{
                            width: '200px', height: '200px', borderRadius: '50%',
                            background: 'radial-gradient(circle, #f43f5e 0%, #be123c 100%)',
                            border: '8px solid #881337',
                            color: 'white', fontSize: '2rem', fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 10px 0 #881337',
                            transform: 'translateY(0)',
                            transition: 'transform 0.05s'
                        }}
                        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(10px)'; e.currentTarget.style.boxShadow = '0 0 0 #881337'; }}
                        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 0 #881337'; }}
                    >
                        SMASH!
                    </button>
                )}
            </div>

            {score > 50 && <p style={{ marginTop: '2rem', color: '#facc15' }}>🔥 You are on fire!</p>}
        </div>
    );
};

export default ButtonSmash;
