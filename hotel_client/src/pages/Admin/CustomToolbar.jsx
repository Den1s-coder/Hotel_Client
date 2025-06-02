import React from 'react';

const CustomToolbar = ({ label,
    onNavigate,
    onView,
    view }) => {
    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={() => onNavigate('PREV')}>Prev</button>
                <button type="button" onClick={() => onNavigate('TODAY')}>Today</button>
                <button type="button" onClick={() => onNavigate('NEXT')}>Next</button>
            </span>

            <span className="rbc-toolbar-label">{label}</span>

            <span className="rbc-btn-group">
                <button
                    type="button"
                    onClick={() => onView('month')}
                    className={view === 'month' ? 'rbc-active' : ''}
                >
                    Month
                </button>
                <button
                    type="button"
                    onClick={() => onView('week')}
                    className={view === 'week' ? 'rbc-active' : ''}
                >
                    Week
                </button>
            </span>
        </div>
    );
};

export default CustomToolbar;