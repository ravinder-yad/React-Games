import React, { useState, useEffect } from 'react';
import { RotateCcw, Brain, Check, X } from 'lucide-react';

const ICONS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [moves, setMoves] = useState(0);

    const shuffleCards = () => {
        const doubled = [...ICONS, ...ICONS];
        const shuffled = doubled
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon }));

        setCards(shuffled);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setDisabled(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    const handleClick = (id) => {
        if (disabled || flipped.includes(id) || solved.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        if (flipped.length === 1) {
            setDisabled(true);
            setFlipped([...flipped, id]);
            setMoves(m => m + 1);
            checkForMatch(id);
        }
    };

    const checkForMatch = (secondId) => {
        const firstId = flipped[0];
        const firstCard = cards.find(c => c.id === firstId);
        const secondCard = cards.find(c => c.id === secondId);

        if (firstCard.icon === secondCard.icon) {
            setSolved(prev => [...prev, firstId, secondId]);
            setFlipped([]);
            setDisabled(false);
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000);
        }
    };

    const isWon = solved.length === cards.length && cards.length > 0;

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Memory Flip</h1>
                <p className="game-desc">Find all matching pairs!</p>
            </header>

            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    Moves: {moves}
                </div>
                {isWon && <div style={{ color: '#4ade80', fontWeight: 'bold' }}>You Won! 🎉</div>}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                {cards.map(card => {
                    const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
                    const isSolved = solved.includes(card.id);

                    return (
                        <div
                            key={card.id}
                            onClick={() => handleClick(card.id)}
                            style={{
                                aspectRatio: '1',
                                perspective: '1000px',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.6s',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}>
                                {/* Front (Hidden) */}
                                <div style={{
                                    position: 'absolute', width: '100%', height: '100%',
                                    backfaceVisibility: 'hidden',
                                    background: '#1e293b',
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '2px solid #334155'
                                }}>
                                    <Brain size={32} color="#3b82f6" opacity={0.5} />
                                </div>

                                {/* Back (Revealed) */}
                                <div style={{
                                    position: 'absolute', width: '100%', height: '100%',
                                    backfaceVisibility: 'hidden',
                                    background: isSolved ? 'rgba(74, 222, 128, 0.2)' : '#0f172a',
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: isSolved ? '2px solid #4ade80' : '2px solid #38bdf8',
                                    transform: 'rotateY(180deg)',
                                    fontSize: '2.5rem'
                                }}>
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={shuffleCards}
                style={{
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <RotateCcw size={18} /> Restart
            </button>
        </div>
    );
};

export default MemoryGame;
