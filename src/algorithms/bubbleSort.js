export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  bubbleSort(auxiliaryArray, animations);
  return animations;
}

function bubbleSort(auxiliaryArray, animations) {
  const n = auxiliaryArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight items being compared
      animations.push({ type: 'compare', indices: [j, j + 1] });
      
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        // Swap color highlight
        animations.push({ type: 'swap', indices: [j, j + 1] });
        
        // Swap actual heights (overwrites)
        animations.push({ type: 'overwrite', indices: [j, auxiliaryArray[j + 1]] });
        animations.push({ type: 'overwrite', indices: [j + 1, auxiliaryArray[j]] });
        
        // Swap values in auxiliary array
        let temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      }
      
      // Revert colors back
      animations.push({ type: 'revert', indices: [j, j + 1] });
    }
  }
}
