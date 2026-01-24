import React from 'react';
import { Hammer, Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GamePlaceholder = ({ name, category }) => {
    const navigate = useNavigate();

    return (
        <div className="fade-in game-container" style={{
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '100px',
                height: '100px',
                background: 'rgba(56, 189, 248, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                animation: 'pulse 2s infinite'
            }}>
                <Construction size={48} color="#38bdf8" />
            </div>

            <h1 className="game-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{name}</h1>
            <span className={`badge badge-${category.toLowerCase()}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                {category}
            </span>

            <p style={{ maxWidth: '600px', margin: '2rem auto', fontSize: '1.2rem', color: '#94a3b8' }}>
                This game is currently under active development. The ReactVerse engine is compiling the assets and logic for this module.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'transparent',
                        border: '1px solid #334155',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <ArrowLeft size={18} /> Go Back
                </button>

                <button style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#94a3b8',
                    borderRadius: '8px',
                    cursor: 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Hammer size={18} /> In Progress
                </button>
            </div>

            <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(56, 189, 248, 0); }
          100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
        }
      `}</style>
        </div>
    );
};

export default GamePlaceholder;
