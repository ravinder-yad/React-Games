import React, { useState, useRef } from 'react';
import { Zap } from 'lucide-react';

const ReactionTest = () => {
    const [status, setStatus] = useState('idle'); // idle, waiting, ready, result, tooEarly
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);
    const timeoutRef = useRef(null);

    const startTest = () => {
        setStatus('waiting');
        setReactionTime(null);
        const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
        timeoutRef.current = setTimeout(() => {
            setStatus('ready');
            setStartTime(Date.now());
        }, delay);
    };

    const handleClick = () => {
        if (status === 'waiting') {
            clearTimeout(timeoutRef.current);
            setStatus('tooEarly');
        } else if (status === 'ready') {
            const endTime = Date.now();
            setReactionTime(endTime - startTime);
            setStatus('result');
        } else if (status === 'result' || status === 'tooEarly') {
            startTest();
        } else {
            startTest();
        }
    };

    let bgColor = '#1e293b'; // Default
    let text = 'Click to Start';
    let subText = '';

    if (status === 'waiting') {
        bgColor = '#ef4444'; // Red
        text = 'Wait for Green...';
        subText = '';
    } else if (status === 'ready') {
        bgColor = '#4ade80'; // Green
        text = 'CLICK NOW!';
        subText = '';
    } else if (status === 'result') {
        bgColor = '#3b82f6';
        text = `${reactionTime} ms`;
        subText = 'Click to try again';
    } else if (status === 'tooEarly') {
        bgColor = '#f59e0b';
        text = 'Too Early!';
        subText = 'Click to try again';
    }

    return (
        <div
            className="fade-in"
            onClick={handleClick}
            style={{
                height: 'calc(100vh - 64px)', // Adjust for layout if needed, or just fill container
                width: '100%',
                background: bgColor,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'background 0.1s'
            }}
        >
            <Zap size={64} color="white" style={{ marginBottom: '1rem', opacity: 0.8 }} />
            <h1 style={{ fontSize: '4rem', color: 'white', margin: 0 }}>{text}</h1>
            {subText && <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>{subText}</p>}
            {status === 'idle' && <p style={{ marginTop: '2rem', color: '#94a3b8' }}>Test your visual reflexes.</p>}
        </div>
    );
};

export default ReactionTest;
