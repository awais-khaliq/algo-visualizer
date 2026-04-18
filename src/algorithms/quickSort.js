export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  quickSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  return animations;
}

function quickSort(auxiliaryArray, startIndex, endIndex, animations) {
  if (startIndex < endIndex) {
    const pivotIndex = partition(auxiliaryArray, startIndex, endIndex, animations);
    quickSort(auxiliaryArray, startIndex, pivotIndex - 1, animations);
    quickSort(auxiliaryArray, pivotIndex + 1, endIndex, animations);
  }
}

function partition(auxiliaryArray, startIndex, endIndex, animations) {
  let pivotValue = auxiliaryArray[endIndex];
  let pivotIndex = startIndex;
  
  for (let i = startIndex; i < endIndex; i++) {
    animations.push({ type: 'compare', indices: [i, endIndex] });
    
    if (auxiliaryArray[i] < pivotValue) {
      animations.push({ type: 'swap', indices: [i, pivotIndex] });
      
      animations.push({ type: 'overwrite', indices: [i, auxiliaryArray[pivotIndex]] });
      animations.push({ type: 'overwrite', indices: [pivotIndex, auxiliaryArray[i]] });
      
      let temp = auxiliaryArray[i];
      auxiliaryArray[i] = auxiliaryArray[pivotIndex];
      auxiliaryArray[pivotIndex] = temp;
      
      animations.push({ type: 'revert', indices: [i, pivotIndex] });
      pivotIndex++;
    } else {
      animations.push({ type: 'revert', indices: [i, endIndex] });
    }
  }
  
  // Swap pivot
  animations.push({ type: 'swap', indices: [pivotIndex, endIndex] });
  animations.push({ type: 'overwrite', indices: [pivotIndex, auxiliaryArray[endIndex]] });
  animations.push({ type: 'overwrite', indices: [endIndex, auxiliaryArray[pivotIndex]] });
  animations.push({ type: 'revert', indices: [pivotIndex, endIndex] });
  
  let temp = auxiliaryArray[pivotIndex];
  auxiliaryArray[pivotIndex] = auxiliaryArray[endIndex];
  auxiliaryArray[endIndex] = temp;
  
  return pivotIndex;
}
