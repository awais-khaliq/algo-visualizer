import React, { useState, useEffect } from 'react';
import './App.css';
import SortingVisualizer from './components/SortingVisualizer';
import Toolbar from './components/Toolbar';
import { getMergeSortAnimations } from './algorithms/mergeSort';
import { getBubbleSortAnimations } from './algorithms/bubbleSort';
import { getQuickSortAnimations } from './algorithms/quickSort';

// Control the speed of the animations
const ANIMATION_SPEED_MS = 5;
// Default number of array bars
const DEFAULT_NUMBER_OF_ARRAY_BARS = 100;
// Primary color of array bars
const PRIMARY_COLOR = 'var(--bar-default)';
// Color of array bars when they are being compared
const SECONDARY_COLOR = 'var(--bar-compare)';
// Color when being swapped
const SWAP_COLOR = 'var(--bar-swap)';
// Color when sorted
const SORTED_COLOR = 'var(--bar-sorted)';

function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(DEFAULT_NUMBER_OF_ARRAY_BARS);
  const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEED_MS);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
    
    // Reset all bar colors instantly
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
      arrayBars[i].style.boxShadow = `0 0 10px var(--bar-default-glow)`;
    }
  };

  const checkSortedAndAnimate = () => {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = SORTED_COLOR;
          arrayBars[i].style.boxShadow = `0 0 15px var(--bar-sorted-glow)`;
        }, i * (animationSpeed + 5));
      }
  };

  const handleAnimation = (animations) => {
    setIsSorting(true);
    const arrayBars = document.getElementsByClassName('array-bar');
    
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i].type !== 'overwrite';
      
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i].indices;
        const color = animations[i].type === 'compare' ? SECONDARY_COLOR : 
                      animations[i].type === 'revert' ? PRIMARY_COLOR : SWAP_COLOR;
        
        const glowColor = animations[i].type === 'compare' ? 'rgba(234, 179, 8, 0.6)' : 
                          animations[i].type === 'revert' ? 'var(--bar-default-glow)' : 'rgba(239, 68, 68, 0.8)';

        setTimeout(() => {
          if (arrayBars[barOneIdx]) {
             arrayBars[barOneIdx].style.backgroundColor = color;
             arrayBars[barOneIdx].style.boxShadow = `0 0 10px ${glowColor}`;
          }
          if (arrayBars[barTwoIdx]) {
             arrayBars[barTwoIdx].style.backgroundColor = color;
             arrayBars[barTwoIdx].style.boxShadow = `0 0 10px ${glowColor}`;
          }
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i].indices;
          if (arrayBars[barOneIdx]) {
             arrayBars[barOneIdx].style.height = `${newHeight}px`;
          }
        }, i * animationSpeed);
      }
    }

    // Reset isSorting flag after max animation timeout
    setTimeout(() => {
      setIsSorting(false);
      checkSortedAndAnimate();
    }, animations.length * animationSpeed);
  };

  const mergeSort = () => {
    if (isSorting) return;
    const animations = getMergeSortAnimations(array);
    handleAnimation(animations);
  };

  const quickSort = () => {
    if (isSorting) return;
    const animations = getQuickSortAnimations(array);
    handleAnimation(animations);
  };

  const bubbleSort = () => {
    if (isSorting) return;
    const animations = getBubbleSortAnimations(array);
    handleAnimation(animations);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Algorithm <span>Visualizer</span></h1>
      </header>
      
      <Toolbar 
        resetArray={resetArray}
        mergeSort={mergeSort}
        quickSort={quickSort}
        bubbleSort={bubbleSort}
        isSorting={isSorting}
        arraySize={arraySize}
        setArraySize={setArraySize}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      
      <SortingVisualizer array={array} />
    </div>
  );
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default App;
