import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const SlidingPuzzle = () => {
    const [tiles, setTiles] = useState([]);
    const [isSolved, setIsSolved] = useState(false);

    // Initialize sorted array: 1..15, null
    const solvedState = [...Array(15).keys()].map(n => n + 1).concat(null);

    const shuffle = (array) => {
        // Basic shuffle: random moves from solved state to ensure solvability
        let arr = [...array];
        let emptyIdx = 15;
        let moves = 100;

        while (moves > 0) {
            const neighbors = [];
            const row = Math.floor(emptyIdx / 4);
            const col = emptyIdx % 4;

            if (row > 0) neighbors.push(emptyIdx - 4);
            if (row < 3) neighbors.push(emptyIdx + 4);
            if (col > 0) neighbors.push(emptyIdx - 1);
            if (col < 3) neighbors.push(emptyIdx + 1);

            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            [arr[emptyIdx], arr[randomNeighbor]] = [arr[randomNeighbor], arr[emptyIdx]];
            emptyIdx = randomNeighbor;
            moves--;
        }
        return arr;
    };

    const initGame = () => {
        setTiles(shuffle(solvedState));
        setIsSolved(false);
    };

    useEffect(() => {
        initGame();
    }, []);

    const moveTile = (index) => {
        if (isSolved) return;

        const emptyIndex = tiles.indexOf(null);
        const row = Math.floor(index / 4);
        const col = index % 4;
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;

        const isAdjacent =
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow);

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);

            if (checkWin(newTiles)) {
                setIsSolved(true);
            }
        }
    };

    const checkWin = (currentTiles) => {
        for (let i = 0; i < 15; i++) {
            if (currentTiles[i] !== i + 1) return false;
        }
        return true;
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">15 Puzzle</h1>
                <p className="game-desc">Order the numbers from 1 to 15.</p>
            </header>

            {isSolved && <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>Solved! 🎉</h2>}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '5px',
                background: '#334155',
                padding: '10px',
                borderRadius: '8px',
                width: '320px',
                height: '320px',
                margin: '0 auto'
            }}>
                {tiles.map((tile, i) => (
                    <div
                        key={i}
                        onClick={() => tile && moveTile(i)}
                        style={{
                            background: tile ? '#3b82f6' : 'transparent',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            cursor: tile ? 'pointer' : 'default',
                            transition: 'transform 0.2s',
                            transform: tile ? 'scale(1)' : 'scale(0.95)',
                            boxShadow: tile ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
                        }}
                    >
                        {tile}
                    </div>
                ))}
            </div>

            <button
                onClick={initGame}
                style={{
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    background: 'transparent',
                    border: '1px solid #94a3b8',
                    color: '#94a3b8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <RotateCcw size={18} /> Shuffle
            </button>
        </div>
    );
};

export default SlidingPuzzle;
