export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push({ type: 'compare', indices: [i, j] });
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[i]] });
      animations.push({ type: 'revert', indices: [i, j] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[j]] });
      animations.push({ type: 'revert', indices: [i, j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  while (i <= middleIdx) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[i]] });
    animations.push({ type: 'revert', indices: [i, i] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  
  while (j <= endIdx) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'overwrite', indices: [k, auxiliaryArray[j]] });
    animations.push({ type: 'revert', indices: [j, j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
