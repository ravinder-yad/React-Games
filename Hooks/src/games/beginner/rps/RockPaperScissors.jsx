import React, { useState } from 'react';
import { RotateCcw, Hand, Scissors, Square } from 'lucide-react';

const options = [
    { id: 'rock', name: 'Rock', icon: <Square size={40} />, beats: 'scissors' },
    { id: 'paper', name: 'Paper', icon: <Hand size={40} />, beats: 'rock' },
    { id: 'scissors', name: 'Scissors', icon: <Scissors size={40} />, beats: 'paper' },
];

const RockPaperScissors = () => {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [score, setScore] = useState({ user: 0, computer: 0 });

    const handlePlay = (choice) => {
        const randomChoice = options[Math.floor(Math.random() * options.length)];
        setUserChoice(choice);
        setComputerChoice(randomChoice);

        if (choice.id === randomChoice.id) {
            setResult('Draw!');
        } else if (choice.beats === randomChoice.id) {
            setResult('You Win!');
            setScore(s => ({ ...s, user: s.user + 1 }));
        } else {
            setResult('Computer Wins!');
            setScore(s => ({ ...s, computer: s.computer + 1 }));
        }
    };

    const resetGame = () => {
        setUserChoice(null);
        setComputerChoice(null);
        setResult(null);
        setScore({ user: 0, computer: 0 });
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Rock Paper Scissors</h1>
                <p className="game-desc">Can you beat the AI?</p>
            </header>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '12px', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>PLAYER</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{score.user}</div>
                </div>
                <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '12px', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>COMPUTER</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{score.computer}</div>
                </div>
            </div>

            <div style={{ height: '120px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {result ? (
                    <div className="fade-in">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '1.5rem' }}>
                            <div style={{ color: '#3b82f6' }}>{userChoice.icon}</div>
                            <div style={{ fontWeight: 'bold', }} >VS</div>
                            <div style={{ color: '#f43f5e' }}>{computerChoice.icon}</div>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '2rem', fontWeight: 'bold', color: result === 'You Win!' ? '#4ade80' : result === 'Draw!' ? '#fff' : '#f43f5e' }}>
                            {result}
                        </div>
                    </div>
                ) : (
                    <div style={{ color: '#94a3b8' }}>Choose your weapon below...</div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => handlePlay(opt)}
                        style={{
                            padding: '2rem',
                            background: '#334155',
                            border: '2px solid transparent',
                            borderRadius: '16px',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#3b82f6'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}
                    >
                        {opt.icon}
                        <span style={{ fontWeight: '600' }}>{opt.name}</span>
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <button
                    onClick={resetGame}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <RotateCcw size={16} /> Reset Score
                </button>
            </div>
        </div>
    );
};

export default RockPaperScissors;
