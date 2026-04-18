import React from 'react';
import './Toolbar.css';

const Toolbar = ({
  resetArray,
  mergeSort,
  quickSort,
  bubbleSort,
  isSorting,
  arraySize,
  setArraySize,
  animationSpeed,
  setAnimationSpeed
}) => {
  return (
    <div className="toolbar">
      <div className="controls-group">
        <div className="slider-container">
          <label htmlFor="arraySize">Array Size ({arraySize})</label>
          <input
            id="arraySize"
            type="range"
            min="10"
            max="200"
            step="10"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isSorting}
            className={isSorting ? "disabled" : ""}
          />
        </div>
        <div className="slider-container">
          <label htmlFor="animationSpeed">Speed ({animationSpeed}ms)</label>
          <input
            id="animationSpeed"
            type="range"
            min="1"
            max="50"
            step="1"
            value={animationSpeed}
            // Reverse direction logically: higher visually = lower ms (faster)
            // But here we'll just keep it simple. User sets delay ms. Lower is faster.
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            disabled={isSorting}
            className={isSorting ? "disabled" : ""}
          />
        </div>
      </div>
      
      <div className="buttons-group">
        <button 
          className="btn-primary generate" 
          onClick={resetArray} 
          disabled={isSorting}
        >
          Generate New Array
        </button>
        
        <div className="divider"></div>

        <button 
          className="btn-algorithm" 
          onClick={bubbleSort} 
          disabled={isSorting}
        >
          Bubble Sort
        </button>
        <button 
          className="btn-algorithm" 
          onClick={mergeSort} 
          disabled={isSorting}
        >
          Merge Sort
        </button>
        <button 
          className="btn-algorithm" 
          onClick={quickSort} 
          disabled={isSorting}
        >
          Quick Sort
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
