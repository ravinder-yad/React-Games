import React, { useState, useRef } from 'react';
import { Timer, RotateCcw } from 'lucide-react';

const TimerGame = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [target, setTarget] = useState(5.00);
    const [result, setResult] = useState(null);

    const timerRef = useRef(null);

    const start = () => {
        // New Random Target between 3.00 and 10.00
        const newTarget = (Math.random() * 7 + 3).toFixed(2);
        setTarget(newTarget);

        setTime(0);
        setResult(null);
        setRunning(true);

        const startTimeResult = Date.now();
        timerRef.current = setInterval(() => {
            setTime((Date.now() - startTimeResult) / 1000);
        }, 10);
    };

    const stop = () => {
        clearInterval(timerRef.current);
        setRunning(false);

        const diff = Math.abs(time - target);
        let msg = '';
        if (diff < 0.05) msg = 'Perfect! 🏆';
        else if (diff < 0.2) msg = 'Great! 🥈';
        else if (diff < 0.5) msg = 'Good 🥉';
        else msg = 'Try Again ❌';

        setResult(msg);
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Stopwatch Master</h1>
                <p className="game-desc">Stop the timer exactly at the target!</p>
            </header>

            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', borderRadius: '16px' }}>
                <h2 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Target</h2>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#facc15' }}>{parseFloat(target).toFixed(2)}s</div>

                <div style={{ margin: '2rem 0', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '4rem', fontFamily: 'monospace', color: running ? 'white' : (Math.abs(time - target) < 0.1 ? '#4ade80' : 'white') }}>
                        {time.toFixed(2)}s
                    </div>
                </div>

                {!running ? (
                    <button onClick={start} style={{ padding: '1rem 3rem', fontSize: '1.2rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
                        {time === 0 ? 'Start' : 'Retry'}
                    </button>
                ) : (
                    <button onClick={stop} style={{ padding: '1rem 3rem', fontSize: '1.2rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
                        STOP
                    </button>
                )}

                {result && <div style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold', animation: 'popIn 0.3s' }}>{result}</div>}
            </div>
        </div>
    );
};

export default TimerGame;
