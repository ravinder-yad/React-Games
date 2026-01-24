import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TicTacToe from './games/beginner/tictactoe/TicTacToe';
import RockPaperScissors from './games/beginner/rps/RockPaperScissors';
import GuessNumber from './games/beginner/guess-number/GuessNumber';
import DiceRoll from './games/beginner/dice-roll/DiceRoll';
import CoinToss from './games/beginner/coin-toss/CoinToss';
import ColorMatch from './games/beginner/color-match/ColorMatch';
import ButtonSmash from './games/beginner/button-smash/ButtonSmash';
import MathQuiz from './games/beginner/math-quiz/MathQuiz';
import WordCounter from './games/beginner/word-counter/WordCounter';
import LightSwitch from './games/beginner/light-switch/LightSwitch';
import DragDrop from './games/beginner/drag-drop/DragDrop';
import EmojiGuess from './games/beginner/emoji-guess/EmojiGuess';
import RandomJoke from './games/beginner/random-joke/RandomJoke';
import ReactionTest from './games/beginner/reaction-test/ReactionTest';
import ShapeClick from './games/beginner/shape-click/ShapeClick';
import TimerGame from './games/beginner/timer-game/TimerGame';
import TypingSpeed from './games/beginner/typing-speed/TypingSpeed';
import SnakeGame from './games/intermediate/snake/SnakeGame';
import MemoryGame from './games/intermediate/memory/MemoryGame';
import SlidingPuzzle from './games/intermediate/sliding-puzzle/SlidingPuzzle';
import Game2048 from './games/advanced/2048/Game2048';
import GamePlaceholder from './components/common/GamePlaceholder';
import { gamesList } from './data/gamesList';
import './App.css';

function App() {
  const placeholderGames = useMemo(() => {
    // List of games that are actually implemented
    const implementedPaths = [
      '/games/tic-tac-toe',
      '/games/rps',
      '/games/guess-number',
      '/games/dice-roll',
      '/games/coin-toss',
      '/games/color-match',
      '/games/button-smash',
      '/games/math-quiz',
      '/games/word-counter',
      '/games/light-switch',
      '/games/drag-drop',
      '/games/emoji-guess',
      '/games/random-joke',
      '/games/reaction-test',
      '/games/shape-click',
      '/games/timer-game',
      '/games/typing-speed',
      '/games/snake',
      '/games/memory-card', // Watch out: gamesList uses 'memory-card' but file is 'memory'? Checking gamesList
      '/games/sliding-puzzle',
      '/games/2048'
    ];
    // In gamesList.js:
    // Snake is id 26, path "/games/snake" -> OK
    // Memory Card Match is id 31, path "/games/memory-card" -> OK. I made MemoryGame.jsx.
    // Sliding Puzzle is id 32, path "/games/sliding-puzzle" -> OK. I made SlidingPuzzle.jsx.
    // 2048 is id 53, path "/games/2048" -> OK. I made Game2048.jsx

    return gamesList.filter(g => !implementedPaths.includes(g.path));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Real Implementations */}
        <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/games/rps" element={<RockPaperScissors />} />
        <Route path="/games/guess-number" element={<GuessNumber />} />
        <Route path="/games/dice-roll" element={<DiceRoll />} />
        <Route path="/games/coin-toss" element={<CoinToss />} />
        <Route path="/games/color-match" element={<ColorMatch />} />
        <Route path="/games/button-smash" element={<ButtonSmash />} />
        <Route path="/games/math-quiz" element={<MathQuiz />} />
        <Route path="/games/word-counter" element={<WordCounter />} />
        <Route path="/games/light-switch" element={<LightSwitch />} />

        <Route path="/games/snake" element={<SnakeGame />} />
        <Route path="/games/memory-card" element={<MemoryGame />} />
        <Route path="/games/sliding-puzzle" element={<SlidingPuzzle />} />
        <Route path="/games/2048" element={<Game2048 />} />

        {/* Dynamic Placeholder Routes */}
        {placeholderGames.map(game => (
          <Route
            key={game.id}
            path={game.path}
            element={<GamePlaceholder name={game.name} category={game.category} />}
          />
        ))}

        {/* Category Routes */}
        <Route path="/games/all" element={<Home filter="All" />} />
        <Route path="/games/beginner" element={<Home filter="Beginner" />} />
        <Route path="/games/intermediate" element={<Home filter="Intermediate" />} />
        <Route path="/games/advanced" element={<Home filter="Advanced" />} />
        <Route path="/games/hardcore" element={<Home filter="Hardcore" />} />
        <Route path="/games/experimental" element={<Home filter="Experimental" />} />

        {/* System Routes */}
        <Route path="/store" element={<div className="game-container"><h1 className="game-title">Game Store</h1></div>} />
        <Route path="/about" element={<div className="game-container"><h1 className="game-title">About ReactVerse</h1></div>} />
      </Route>
    </Routes>
  );
}

export default App;
