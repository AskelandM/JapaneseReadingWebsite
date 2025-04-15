// ProgressBar.js
import React from 'react';

const ProgressBar = ({ current = 0, total }) => {
  const percentage = total === 0 ? 0 : (current / total) * 100;
  console.log("Current:", current, "Total:", total, "Percent:", percentage);
  return (
    <div style={{
      width: '80%',
      height: '20px',
      backgroundColor: '#eee',
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: '#3b82f6'
      }} />
    </div>
  );
};

export default ProgressBar;
