import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const Game2048 = () => {
    const [board, setBoard] = useState(Array(4).fill(Array(4).fill(0)));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const initGame = () => {
        let newBoard = Array(4).fill().map(() => Array(4).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
    };

    useEffect(() => {
        initGame();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;

            let moved = false;
            let newBoard = board.map(row => [...row]);

            switch (e.key) {
                case 'ArrowUp': moved = moveUp(newBoard); break;
                case 'ArrowDown': moved = moveDown(newBoard); break;
                case 'ArrowLeft': moved = moveLeft(newBoard); break;
                case 'ArrowRight': moved = moveRight(newBoard); break;
                default: return; // Ignore other keys
            }

            if (moved) {
                addRandomTile(newBoard);
                setBoard(newBoard);
                if (checkGameOver(newBoard)) {
                    setGameOver(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [board, gameOver]);

    const addRandomTile = (currentBoard) => {
        let emptyTiles = [];
        currentBoard.forEach((row, r) => {
            row.forEach((val, c) => {
                if (val === 0) emptyTiles.push({ r, c });
            });
        });

        if (emptyTiles.length > 0) {
            const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            currentBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    // Logic functions for 2048 movement
    // Helper: Slide non-zero elements to left
    const slideRow = (row) => {
        let arr = row.filter(val => val);
        let missing = 4 - arr.length;
        let zeros = Array(missing).fill(0);
        return arr.concat(zeros);
    };

    // Helper: Merge duplicates
    const combineRow = (row) => {
        for (let i = 0; i < 3; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] *= 2;
                setScore(s => s + row[i]);
                row[i + 1] = 0;
            }
        }
        return row;
    };

    const moveLeft = (board) => {
        let moved = false;
        for (let r = 0; r < 4; r++) {
            let oldRow = board[r].join(',');
            let row = board[r];
            row = slideRow(row);
            row = combineRow(row);
            row = slideRow(row);
            board[r] = row;
            if (board[r].join(',') !== oldRow) moved = true;
        }
        return moved;
    };

    const moveRight = (board) => {
        let moved = false;
        for (let r = 0; r < 4; r++) {
            let oldRow = board[r].join(',');
            let row = board[r].reverse(); // visual reverse
            row = slideRow(row);
            row = combineRow(row);
            row = slideRow(row);
            board[r] = row.reverse();
            if (board[r].join(',') !== oldRow) moved = true;
        }
        return moved;
    };

    const moveUp = (board) => {
        let moved = false;
        for (let c = 0; c < 4; c++) {
            let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
            let oldRow = row.join(',');
            row = slideRow(row);
            row = combineRow(row);
            row = slideRow(row);
            if (row.join(',') !== oldRow) moved = true;
            // put back
            for (let r = 0; r < 4; r++) { board[r][c] = row[r]; }
        }
        return moved;
    };

    const moveDown = (board) => {
        let moved = false;
        for (let c = 0; c < 4; c++) {
            let row = [board[0][c], board[1][c], board[2][c], board[3][c]].reverse();
            let oldRow = row.join(',');
            row = slideRow(row);
            row = combineRow(row);
            row = slideRow(row);
            row.reverse();
            if (row.join(',') !== oldRow) moved = true;
            for (let r = 0; r < 4; r++) { board[r][c] = row[r]; }
        }
        return moved;
    };

    const checkGameOver = (board) => {
        // Check for 0
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (board[r][c] === 0) return false;
        // Check for merges
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (c < 3 && board[r][c] === board[r][c + 1]) return false;
                if (r < 3 && board[r][c] === board[r + 1][c]) return false;
            }
        }
        return true;
    };

    const getCellColor = (val) => {
        switch (val) {
            case 0: return '#1e293b';
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f65e3b';
            case 128: return '#edcf72';
            case 256: return '#edcc61';
            case 512: return '#edc850';
            case 1024: return '#edc53f';
            case 2048: return '#edc22e';
            default: return '#3c3a32';
        }
    };

    const getTextColor = (val) => val <= 4 ? '#776e65' : '#f9f6f2';

    return (
        <div className="fade-in game-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">2048</h1>
                <p className="game-desc">Join the numbers to get the 2048 tile!</p>
            </header>

            <div style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                Score: <span style={{ color: '#3b82f6' }}>{score}</span>
            </div>

            <div style={{
                background: '#bbada0',
                padding: '10px',
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                width: '320px',
                height: '320px',
                position: 'relative'
            }}>
                {board.map((row, r) => (
                    row.map((val, c) => (
                        <div key={`${r}-${c}`} style={{
                            background: getCellColor(val),
                            color: getTextColor(val),
                            width: '100%',
                            height: '100%',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: val > 1000 ? '1.5rem' : '2rem',
                            transition: 'background 0.2s, color 0.2s, transform 0.2s',
                        }}>
                            {val !== 0 ? val : ''}
                        </div>
                    ))
                ))}

                {gameOver && (
                    <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(238, 228, 218, 0.73)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '8px'
                    }}>
                        <h2 style={{ fontSize: '3rem', color: '#776e65', marginBottom: '1rem' }}>Game Over</h2>
                        <button onClick={initGame} style={{ padding: '0.75rem 1.5rem', background: '#8f7a66', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.2rem' }}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            <p style={{ marginTop: '2rem', color: '#94a3b8' }}>Use arrow keys to move tiles.</p>
        </div>
    );
};

export default Game2048;
