import React, { useState } from 'react';
import styles from '../styles/SpinningPiSpiral.module.css';

const SpinningPiSpiral = () => {
  const [isHovering, setIsHovering] = useState(false);
  const piDigits = "3.14159265358979323846264338327950288419716939937510";

  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {piDigits.split('').map((digit, index) => (
        <span 
          key={index} 
          className={`${styles.digit} ${isHovering ? styles.paused : ''}`}
          style={{
            '--index': index,
            '--total': piDigits.length,
          }}
        >
          {digit}
        </span>
      ))}
    </div>
  );
};

export default SpinningPiSpiral;