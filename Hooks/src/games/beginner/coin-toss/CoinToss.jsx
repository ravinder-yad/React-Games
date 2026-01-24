import React, { useState } from 'react';

const CoinToss = () => {
    const [result, setResult] = useState(null);
    const [flipping, setFlipping] = useState(false);
    const [history, setHistory] = useState([]);

    const flip = () => {
        setFlipping(true);
        setResult(null);

        setTimeout(() => {
            const outcome = Math.random() < 0.5 ? 'HEADS' : 'TAILS';
            setResult(outcome);
            setHistory(prev => [outcome, ...prev].slice(0, 10)); // Keep last 10
            setFlipping(false);
        }, 1000); // 1s flip animation
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Coin Toss</h1>
                <p className="game-desc">Heads or Tails?</p>
            </header>

            <div style={{ perspective: '1000px', margin: '3rem auto' }}>
                <div style={{
                    width: '200px', height: '200px', margin: '0 auto', fontSize: '2rem', fontWeight: 'bold',
                    position: 'relative', transformStyle: 'preserve-3d',
                    transition: 'transform 1s',
                    transform: flipping ? 'rotateY(1800deg)' : 'rotateY(0deg)', // Spins a lot
                    background: '#fbbf24', borderRadius: '50%', border: '10px solid #d97706',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#78350f',
                    boxShadow: '0 10px 30px rgba(251, 191, 36, 0.4)'
                }}>
                    {!flipping && (result || '?')}
                </div>
            </div>

            <button onClick={flip} disabled={flipping} style={{
                marginTop: '2rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold',
                background: '#d97706', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
            }}>
                {flipping ? 'Flipping...' : 'FLIP COIN'}
            </button>

            {history.length > 0 && (
                <div style={{ marginTop: '3rem', maxWidth: '400px', margin: '3rem auto' }}>
                    <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>History</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', justifyContent: 'center' }}>
                        {history.map((h, i) => (
                            <span key={i} style={{
                                padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem',
                                background: h === 'HEADS' ? '#3b82f6' : '#ef4444', color: 'white'
                            }}>
                                {h[0]}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoinToss;
