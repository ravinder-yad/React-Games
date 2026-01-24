import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakeHighScore')) || 0);
    const [isPlaying, setIsPlaying] = useState(false);
    const gameLoopRef = useRef();

    useEffect(() => {
        if (isPlaying && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
        } else {
            clearInterval(gameLoopRef.current);
        }
        return () => clearInterval(gameLoopRef.current);
    }, [isPlaying, gameOver, snake]); // Dependency on snake to keep closure fresh? Better use functional updates.

    // Using functional update in setInterval to avoid stale state dependency issues
    // But strictly, we need the latest 'direction' which is state.
    // Actually, for the interval to work smoothly with updated state, we often stick to a ref for direction or just rely on re-renders. 
    // Let's rely on standard re-render for simplicity, but optimized.

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction]);

    const moveSnake = () => {
        setSnake((prevSnake) => {
            const head = { ...prevSnake[0] };

            switch (direction) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
                default: break;
            }

            // Check Collision with Walls
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                handleGameOver();
                return prevSnake;
            }

            // Check Collision with Self
            if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                handleGameOver();
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Check Food
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                generateFood(newSnake);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    };

    const generateFood = (currentSnake) => {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            // Make sure food doesn't spawn on snake
            const onSnake = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
            if (!onSnake) break;
        }
        setFood(newFood);
    };

    const handleGameOver = () => {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score);
        }
    };

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
    };

    return (
        <div className="fade-in game-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Neon Snake</h1>
                <p className="game-desc">Use Arrow Keys to move. Don't hit the walls!</p>
            </header>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    Score: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{score}</span>
                </div>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trophy size={16} color="#facc15" /> High: {highScore}
                </div>
            </div>

            <div style={{
                position: 'relative',
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                background: '#0f172a',
                border: '2px solid #334155',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)'
            }}>
                {snake.map((segment, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: segment.x * CELL_SIZE,
                        top: segment.y * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        background: i === 0 ? '#38bdf8' : 'rgba(56, 189, 248, 0.6)',
                        borderRadius: i === 0 ? '4px' : '2px',
                        boxShadow: i === 0 ? '0 0 10px #38bdf8' : 'none',
                        zIndex: i === 0 ? 2 : 1
                    }} />
                ))}
                <div style={{
                    position: 'absolute',
                    left: food.x * CELL_SIZE,
                    top: food.y * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    background: '#ef4444',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #ef4444',
                    animation: 'pulse 1s infinite'
                }} />

                {/* Overlay for Game Over / Start */}
                {(!isPlaying && !gameOver) && (
                    <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <button onClick={() => setIsPlaying(true)} className="glass-panel" style={{
                            padding: '1rem 2rem', color: 'white', border: '1px solid #38bdf8', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold'
                        }}>
                            <Play size={24} /> Start Game
                        </button>
                    </div>
                )}

                {gameOver && (
                    <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <h2 style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '1rem' }}>Game Over!</h2>
                        <button onClick={resetGame} className="glass-panel" style={{
                            padding: '0.75rem 1.5rem', color: 'white', border: '1px solid #ef4444', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                            <RotateCcw size={20} /> Try Again
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Controls (Optional) */}
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div></div>
                <button onClick={() => direction !== 'DOWN' && setDirection('UP')} style={{ padding: '1rem', background: '#334155', borderRadius: '8px', border: 'none', color: 'white' }}>↑</button>
                <div></div>
                <button onClick={() => direction !== 'RIGHT' && setDirection('LEFT')} style={{ padding: '1rem', background: '#334155', borderRadius: '8px', border: 'none', color: 'white' }}>←</button>
                <button onClick={() => direction !== 'UP' && setDirection('DOWN')} style={{ padding: '1rem', background: '#334155', borderRadius: '8px', border: 'none', color: 'white' }}>↓</button>
                <button onClick={() => direction !== 'LEFT' && setDirection('RIGHT')} style={{ padding: '1rem', background: '#334155', borderRadius: '8px', border: 'none', color: 'white' }}>→</button>
            </div>
        </div>
    );
};

export default SnakeGame;
