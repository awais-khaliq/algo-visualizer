import React from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = ({ array }) => {
  return (
    <div className="visualizer-container">
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
