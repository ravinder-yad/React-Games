import React, { useState, useEffect } from 'react';
import { Circle, Square, Triangle, Hexagon } from 'lucide-react';

const options = [
    { id: 'circle', icon: <Circle size={64} fill="#ec4899" color="#ec4899" /> },
    { id: 'square', icon: <Square size={64} fill="#3b82f6" color="#3b82f6" /> },
    { id: 'triangle', icon: <Triangle size={64} fill="#eab308" color="#eab308" /> },
    { id: 'hexagon', icon: <Hexagon size={64} fill="#a855f7" color="#a855f7" /> },
];

const ShapeClick = () => {
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        startRound();
    }, []);

    const startRound = () => {
        // Pick random target
        const t = options[Math.floor(Math.random() * options.length)];
        setTarget(t);

        // Generate random positions for 4 shapes
        const pos = options.map(opt => ({
            ...opt,
            top: `${Math.random() * 60 + 10}%`,
            left: `${Math.random() * 80 + 10}%`
        }));
        setPositions(pos);
    };

    const handleClick = (id) => {
        if (id === target.id) {
            setScore(s => s + 1);
            setMessage('Good!');
            startRound();
        } else {
            setScore(s => Math.max(0, s - 1));
            setMessage('Miss!');
        }
    };

    return (
        <div className="fade-in game-container">
            <header className="game-header" style={{ marginBottom: '1rem' }}>
                <h1 className="game-title">Shape Click</h1>
                <p className="game-desc">Click the: <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#facc15' }}>{target?.id}</span></p>
            </header>

            <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                Score: {score} <span style={{ fontSize: '1rem', color: message === 'Good!' ? '#4ade80' : '#f87171' }}>{message}</span>
            </div>

            <div style={{
                height: '400px',
                background: '#1e293b',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #334155'
            }}>
                {positions.map((s, i) => (
                    <div
                        key={i}
                        onClick={() => handleClick(s.id)}
                        style={{
                            position: 'absolute',
                            top: s.top,
                            left: s.left,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-out'
                        }}
                    >
                        {s.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShapeClick;
