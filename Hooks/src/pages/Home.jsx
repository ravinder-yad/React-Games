import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Play, Star, ArrowRight } from 'lucide-react';
import { gamesList } from '../data/gamesList';

const Home = ({ filter }) => {
    // Utility to group games or filter them
    const sections = useMemo(() => {
        if (filter === 'All') {
            return [{ title: "All Games Collection", games: gamesList }];
        }
        if (filter) {
            return [{ title: `${filter} Collection`, games: gamesList.filter(g => g.category === filter) }];
        }
        return [
            { title: "Trending Now", games: gamesList.slice(0, 8) },
            { title: "Beginner's Start", games: gamesList.filter(g => g.category === 'Beginner') },
            { title: "Intermediate Challenges", games: gamesList.filter(g => g.category === 'Intermediate') },
            { title: "Advanced Logic", games: gamesList.filter(g => g.category === 'Advanced') },
            { title: "Hardcore & Extreme", games: gamesList.filter(g => g.category === 'Hardcore') },
        ];
    }, [filter]);

    // Dynamic colors based on ID for visual variety
    const getGameColor = (id) => {
        const colors = ['#4ade80', '#facc15', '#f87171', '#38bdf8', '#a78bfa', '#fbbf24', '#34d399', '#ef4444'];
        return colors[id % colors.length];
    };

    // Helper to generate a gradient based on game color
    const getGradient = (color) => {
        return `linear-gradient(135deg, ${color}22 0%, ${color}05 100%)`;
    };

    return (
        <div className="fade-in">
            {/* Hero Banner - Only show on main Home */}
            {!filter && (
                <div className="hero-banner">
                    <div className="hero-content">
                        <h1 className="hero-title">ReactVerse<span style={{ color: '#38bdf8' }}>.</span></h1>
                        <p className="hero-sub">
                            Access the complete vault of 100+ React-powered games. From Tic-Tac-Toe to Complex AI Simulations.
                        </p>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <Link to="/games/tic-tac-toe" style={{
                                padding: '0.75rem 2rem',
                                background: 'white',
                                color: 'black',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Play size={20} fill="black" /> Play Featured
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Header */}
            {filter && (
                <div style={{ padding: '2rem 2rem 0', marginBottom: '1rem' }}>
                    <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>
                        {filter === 'All' ? 'Game Store' : `${filter} Zone`}
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        Browsing {sections[0].games.length} {filter === 'All' ? 'total games' : 'games'}.
                    </p>
                </div>
            )}

            {/* Game Rows */}
            {sections.map((section, idx) => (
                <section key={idx} className="category-section">
                    <h2 className="section-title">
                        <span style={{ width: '4px', height: '20px', background: '#38bdf8', borderRadius: '2px' }}></span>
                        {section.title}
                    </h2>

                    <div className={filter ? 'grid-view' : 'games-row'}>
                        {section.games.map((game) => {
                            const color = getGameColor(game.id);
                            const Icon = game.icon || Gamepad2;

                            return (
                                <Link to={game.path} key={game.id} className="game-card-mini">
                                    <div className="card-image" style={{ background: getGradient(color) }}>
                                        <div className="card-icon-wrapper">
                                            <Icon size={48} color={color} />
                                        </div>
                                    </div>
                                    <div className="card-info">
                                        <h3 className="card-title">{game.name}</h3>
                                        <div className="card-meta">
                                            <span className={`tag-${game.category.toLowerCase()}`} style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                                                {game.category}
                                            </span>
                                            {game.status === 'playable' && <Star size={14} color="#fbbf24" fill="#fbbf24" />}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}

                        {/* View All Card - Only in row view */}
                        {!filter && (
                            <Link to={`/games/${section.title.split(' ')[0].toLowerCase() === 'trending' ? 'all' : section.title.split(' ')[0].toLowerCase()}`}
                                className="game-card-mini"
                                style={{
                                    justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.02)',
                                    borderStyle: 'dashed', minWidth: '220px'
                                }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                                        <ArrowRight color="white" />
                                    </div>
                                    <h3 style={{ color: 'white' }}>View All</h3>
                                </div>
                            </Link>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Home;
