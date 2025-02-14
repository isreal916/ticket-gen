import React from 'react';
import './style/button.css'
const Button = ({ backgroundColor, onClick, text }) => {
    const buttonStyle = {
        backgroundColor: backgroundColor,
      
    };

    return (
        <button style={buttonStyle} id='button' onClick={onClick}>
            {text}
        </button>
    );
};


export default Button;