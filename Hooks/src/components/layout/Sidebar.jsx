import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Gamepad2,
  Brain,
  Zap,
  Flame,
  FlaskConical,
  Trophy,
  LayoutGrid,
  Info
} from 'lucide-react';

const Sidebar = () => {
  const menuGroups = [
    {
      title: "Discover",
      items: [
        { name: 'Dashboard', path: '/', icon: <LayoutGrid size={20} /> },
        { name: 'All Games', path: '/games/all', icon: <Gamepad2 size={20} /> },
      ]
    },
    {
      title: "Categories",
      items: [
        { name: 'Beginner', path: '/games/beginner', icon: <Gamepad2 size={20} className="tag-beginner" /> },
        { name: 'Intermediate', path: '/games/intermediate', icon: <Brain size={20} className="tag-intermediate" /> },
        { name: 'Advanced', path: '/games/advanced', icon: <Zap size={20} className="tag-advanced" /> },
        { name: 'Hardcore', path: '/games/hardcore', icon: <Flame size={20} className="tag-hardcore" /> },
        { name: 'Experimental', path: '/games/experimental', icon: <FlaskConical size={20} /> },
      ]
    },
    {
      title: "Community",
      items: [
        { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
        { name: 'About', path: '/about', icon: <Info size={20} /> },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="brand-section">
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
        }}>
          <Gamepad2 size={20} color="white" />
        </div>
        <span className="brand-logo">ReactVerse</span>
      </div>

      <div className="sidebar-nav">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="nav-group">
            <h3>{group.title}</h3>
            {group.items.map((item, itemIdx) => (
              <NavLink
                key={itemIdx}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '0.7rem', color: '#64748b' }}>v1.0.0 Alpha</p>
        <p style={{ fontSize: '0.7rem', color: '#64748b' }}>Built with React 19</p>
      </div>
    </aside>
  );
};

export default Sidebar;
