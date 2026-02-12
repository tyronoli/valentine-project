import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', style }) => {
    return (
        <button
            className={`${styles.btn} ${styles[variant]}`}
            onClick={onClick}
            style={style} // <--- Pass the dynamic size styles here
        >
            {children}
        </button>
    );
};

export default Button;