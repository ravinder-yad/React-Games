import React, { useState } from 'react';
import { RotateCcw, ThumbsUp, ThumbsDown, User } from 'lucide-react';

const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Knock, knock. Who’s there? Recursion. Recursion who? Knock, knock...",
    "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
    "There are 10 types of people in the world: Those who understand binary, and those who don't.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "I told a joke about UDP, but you probably won't get it."
];

const RandomJoke = () => {
    const [currentJoke, setCurrentJoke] = useState(jokes[0]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const newJoke = () => {
        const random = jokes[Math.floor(Math.random() * jokes.length)];
        setCurrentJoke(random);
    };

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Random Joke</h1>
                <p className="game-desc">Your daily dose of dev humor.</p>
            </header>

            <div className="glass-panel" style={{
                padding: '3rem', margin: '2rem auto', maxWidth: '600px',
                borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', padding: '0.5rem', borderRadius: '50%' }}>
                    <User color="white" size={24} />
                </div>
                <q style={{ fontSize: '1.5rem', fontStyle: 'italic', lineHeight: '1.6' }}>{currentJoke}</q>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <button onClick={() => setLikes(l => l + 1)} style={{ background: 'transparent', border: 'none', color: '#4ade80', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ThumbsUp /> {likes}
                </button>
                <button onClick={() => setDislikes(d => d + 1)} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ThumbsDown /> {dislikes}
                </button>
            </div>

            <button onClick={newJoke} style={{ padding: '0.75rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Next Joke
            </button>
        </div>
    );
};

export default RandomJoke;
