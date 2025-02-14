import React from 'react';

const Progress = ({ value }) => {
    const progressStyle = {
        width: `${value}%`,
        backgroundColor: '#24A0B5',
        height: '5px',
    };

    return (
        <div style={{ width: '100%', backgroundColor: '#0E464F', borderRadius: '5px' }}>
            <div style={progressStyle}></div>
        </div>
    );
};



export default Progress;