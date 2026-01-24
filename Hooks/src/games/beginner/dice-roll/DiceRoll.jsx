import React, { useState } from 'react';
import { Box, RotateCcw } from 'lucide-react';

const DiceRoll = () => {
    const [dice, setDice] = useState([1]);
    const [rolling, setRolling] = useState(false);

    const roll = () => {
        setRolling(true);
        // Simulate animation loop
        let count = 0;
        const interval = setInterval(() => {
            setDice(prev => prev.map(() => Math.floor(Math.random() * 6) + 1));
            count++;
            if (count > 10) {
                clearInterval(interval);
                setRolling(false);
            }
        }, 50);
    };

    const addDie = () => {
        if (dice.length < 6) setDice([...dice, 1]);
    };

    const removeDie = () => {
        if (dice.length > 1) setDice(dice.slice(0, -1));
    };

    const DiceFace = ({ value }) => {
        // Simple pure CSS dice dots
        const dotsMap = {
            1: [[50, 50]],
            2: [[20, 20], [80, 80]],
            3: [[20, 20], [50, 50], [80, 80]],
            4: [[20, 20], [20, 80], [80, 20], [80, 80]],
            5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
            6: [[20, 20], [20, 50], [20, 80], [80, 20], [80, 50], [80, 80]]
        };

        return (
            <div style={{
                width: '80px', height: '80px', background: 'white', borderRadius: '12px',
                position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                transform: rolling ? `rotate(${Math.random() * 20 - 10}deg)` : 'rotate(0deg)',
                transition: 'transform 0.1s'
            }}>
                {dotsMap[value].map((pos, i) => (
                    <div key={i} style={{
                        position: 'absolute', width: '12px', height: '12px', background: '#0f172a', borderRadius: '50%',
                        left: `${pos[0]}%`, top: `${pos[1]}%`, transform: 'translate(-50%, -50%)'
                    }} />
                ))}
            </div>
        );
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Dice Roller</h1>
                <p className="game-desc">Roll up to 6 dice at once.</p>
            </header>

            <div style={{ minHeight: '150px', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                {dice.map((val, i) => <DiceFace key={i} value={val} />)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={addDie} className="glass-panel" style={{ padding: '0.5rem 1rem', color: 'white', cursor: 'pointer', borderRadius: '8px' }}>+ Add Die</button>
                <button onClick={removeDie} className="glass-panel" style={{ padding: '0.5rem 1rem', color: 'white', cursor: 'pointer', borderRadius: '8px' }}>- Remove</button>
            </div>

            <button onClick={roll} disabled={rolling} style={{
                fontSize: '1.5rem', fontWeight: 'bold', padding: '1rem 3rem',
                background: rolling ? '#64748b' : '#3b82f6', color: 'white', border: 'none', borderRadius: '12px',
                cursor: rolling ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                transform: rolling ? 'scale(0.95)' : 'scale(1)'
            }}>
                {rolling ? 'Rolling...' : 'ROLL'}
            </button>
        </div>
    );
};

export default DiceRoll;
