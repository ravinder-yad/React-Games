import React, { useState } from 'react';
import { Lightbulb, LightbulbOff } from 'lucide-react';

const LightSwitch = () => {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
        // Play sound click effect could be nice here
    };

    return (
        <div className="fade-in game-container" style={{
            textAlign: 'center',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'background 0.5s',
            background: isOn ? '#fefce8' : 'transparent', // Light yellow vs transparent (dark)
            borderRadius: '20px'
        }}>
            <header className="game-header">
                <h1 className="game-title" style={{ color: isOn ? '#1e293b' : 'white' }}>Light Switch</h1>
                <p className="game-desc" style={{ color: isOn ? '#475569' : '#94a3b8' }}>Click the switch to toggle the lights.</p>
            </header>

            <div style={{ margin: '2rem auto', cursor: 'pointer' }} onClick={toggle}>
                {isOn ? (
                    <div style={{ filter: 'drop-shadow(0 0 50px #facc15)' }}>
                        <Lightbulb size={200} color="#facc15" strokeWidth={1} fill="#facc15" />
                    </div>
                ) : (
                    <div>
                        <LightbulbOff size={200} color="#475569" strokeWidth={1} />
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={toggle}
                    style={{
                        width: '80px', height: '140px',
                        background: '#e2e8f0',
                        borderRadius: '12px',
                        border: 'none',
                        position: 'relative',
                        cursor: 'pointer',
                        boxShadow: '0 4px 0 #94a3b8'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: isOn ? '10px' : 'auto',
                        bottom: isOn ? 'auto' : '10px',
                        left: '10px', right: '10px', height: '60px',
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s'
                    }} />
                </button>
            </div>

            <p style={{ marginTop: '2rem', color: isOn ? '#475569' : '#64748b' }}>
                {isOn ? "It's bright in here!" : "It's dark..."}
            </p>
        </div>
    );
};

export default LightSwitch;
