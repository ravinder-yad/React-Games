import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);
    const status = winner
        ? `Winner: ${winner}`
        : isDraw
            ? "It's a Draw!"
            : `Next Player: ${isXNext ? 'X' : 'O'}`;

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="fade-in game-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Tic Tac Toe</h1>
                <p className="game-desc">The classic strategy game. Get 3 in a row to win!</p>
            </header>

            <div style={{
                marginBottom: '2rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: winner ? '#4ade80' : 'white'
            }}>
                {status}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                backgroundColor: '#334155',
                padding: '10px',
                borderRadius: '12px',
                maxWidth: '400px',
                width: '100%'
            }}>
                {board.map((square, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        style={{
                            background: '#1e293b',
                            border: 'none',
                            borderRadius: '8px',
                            height: '100px',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: square === 'X' ? '#3b82f6' : '#f43f5e',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => !square && !winner && (e.target.style.background = '#2c3b52')}
                        onMouseOut={(e) => !square && !winner && (e.target.style.background = '#1e293b')}
                    >
                        {square}
                    </button>
                ))}
            </div>

            <button
                onClick={resetGame}
                style={{
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem'
                }}
            >
                <RotateCcw size={18} /> Reset Game
            </button>
        </div>
    );
};

export default TicTacToe;
