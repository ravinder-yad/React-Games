import React, { useState, useEffect } from 'react';
import { Palette, Play } from 'lucide-react';

const ColorMatch = () => {
    const [targetColor, setTargetColor] = useState('');
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const colors = ['#ef4444', '#f97316', '#facc15', '#4ade80', '#3b82f6', '#a855f7', '#ec4899', '#ffffff'];

    const generateRound = () => {
        // Pick 3 wrong colors and 1 right color
        const shuffled = [...colors].sort(() => 0.5 - Math.random());
        const roundColors = shuffled.slice(0, 4);
        const target = roundColors[Math.floor(Math.random() * roundColors.length)];
        setOptions(roundColors);
        setTargetColor(target);
        setMessage('');
    };

    const startGame = () => {
        setScore(0);
        setIsPlaying(true);
        generateRound();
    };

    const handleGuess = (color) => {
        if (color === targetColor) {
            setScore(s => s + 1);
            setMessage('Correct! Next...');
            setTimeout(generateRound, 500);
        } else {
            setMessage('Wrong! Game Over.');
            setIsPlaying(false);
        }
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Color Match</h1>
                <p className="game-desc">Match the Hex Code to the correct Color Block.</p>
            </header>

            {!isPlaying ? (
                <div style={{ padding: '3rem' }}>
                    {score > 0 && <h2 style={{ marginBottom: '1rem', color: '#f87171' }}>Final Score: {score}</h2>}
                    <button onClick={startGame} style={{ padding: '1rem 2rem', fontSize: '1.2rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}>
                        <Play /> Start Game
                    </button>
                </div>
            ) : (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Score: {score}</div>

                    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                        {targetColor.toUpperCase()}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {options.map((c) => (
                            <button key={c} onClick={() => handleGuess(c)} style={{
                                height: '100px',
                                background: c,
                                border: '4px solid transparent',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'transform 0.1s'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        ))}
                    </div>
                    <div style={{ minHeight: '30px', marginTop: '1rem', color: '#38bdf8' }}>{message}</div>
                </div>
            )}
        </div>
    );
};

export default ColorMatch;
