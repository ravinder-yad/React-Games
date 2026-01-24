import React, { useState } from 'react';

const WordCounter = () => {
    const [text, setText] = useState('');

    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const paragraphs = text.trim() === '' ? 0 : text.split('\n').filter(p => p.trim() !== '').length;

    return (
        <div className="fade-in game-container">
            <header className="game-header">
                <h1 className="game-title">Word Counter</h1>
                <p className="game-desc">Type below to analyze your text.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{words}</div>
                    <div style={{ color: '#94a3b8' }}>Words</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80' }}>{chars}</div>
                    <div style={{ color: '#94a3b8' }}>Characters (w/ space)</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#facc15' }}>{charsNoSpace}</div>
                    <div style={{ color: '#94a3b8' }}>Characters (no space)</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f87171' }}>{paragraphs}</div>
                    <div style={{ color: '#94a3b8' }}>Paragraphs</div>
                </div>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here to count..."
                style={{
                    width: '100%',
                    minHeight: '300px',
                    padding: '1.5rem',
                    fontSize: '1.1rem',
                    background: '#0f172a',
                    color: 'white',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    resize: 'vertical',
                    lineHeight: '1.6',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
                }}
            />
        </div>
    );
};

export default WordCounter;
