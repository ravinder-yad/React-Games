import React, { useState } from 'react';

const DragDrop = () => {
    const [items, setItems] = useState([
        { id: 1, text: 'A', status: 'pool' },
        { id: 2, text: 'B', status: 'pool' },
        { id: 3, text: 'C', status: 'pool' },
        { id: 4, text: 'D', status: 'pool' },
    ]);

    const onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, status) => {
        const id = e.dataTransfer.getData("id");
        setItems(prev => prev.map(item => {
            if (item.id.toString() === id) {
                return { ...item, status };
            }
            return item;
        }));
    };

    const renderColumn = (status, title, color) => (
        <div
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
            style={{
                width: '150px',
                minHeight: '200px',
                background: 'rgba(255,255,255,0.05)',
                border: `2px dashed ${color}`,
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}
        >
            <h3 style={{ textAlign: 'center', color: color }}>{title}</h3>
            {items.filter(i => i.status === status).map(item => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                    style={{
                        padding: '1rem',
                        background: color,
                        color: '#0f172a',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        cursor: 'grab',
                        textAlign: 'center'
                    }}
                >
                    {item.text}
                </div>
            ))}
        </div>
    );

    return (
        <div className="fade-in game-container" style={{ textAlign: 'center' }}>
            <header className="game-header">
                <h1 className="game-title">Drag & Drop</h1>
                <p className="game-desc">Move items between containers.</p>
            </header>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                {renderColumn('pool', 'Start', '#94a3b8')}
                {renderColumn('target1', 'Blue Zone', '#3b82f6')}
                {renderColumn('target2', 'Green Zone', '#4ade80')}
            </div>

            <p style={{ marginTop: '2rem', color: '#64748b' }}>Drag items to sort them.</p>
        </div>
    );
};

export default DragDrop;
