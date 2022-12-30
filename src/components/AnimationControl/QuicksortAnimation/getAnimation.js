
export default function getAnimation(array) {
  let sequence = [];
  let N = array.length;
  quickSortHelper(array, 0, N - 1, sequence);
  sequence.push(['completed']);
  return [sequence, array];
}

function quickSortHelper(array, first, last, sequence) {
  if (first < last) {
      let p = partition(array, first, last, sequence); // final position for pivot
      sequence.push(['sorted', p, array[p]]);
      quickSortHelper(array, first, p - 1, sequence);
      quickSortHelper(array, p + 1, last, sequence);
  } else {
    const i = first === last ? first : last;
    sequence.push(['sorted', i, array[i]]);
  };
};

function partition(array, first, last, sequence) {
  // changing color for pivot and initializing color for other elements
  sequence.push(['partition', [first, array[first]], [last, array[last]]]);
  let pivot = array[first]; // initial position for pivot
  let i = first + 1; // left pointer
  let j = last; // right pointer
  // find final position for pivot
  while (i <= j) {
      while (array[i] <= pivot) {
        sequence.push(['left', i, array[i]]);
        i++;
      };
      while (array[j] > pivot) {
        sequence.push(['right', j, array[j]]);
        j--;
      };
      // swap i, j elements
      if (i < j) {
        // change color before swapping
        // sequence.push(['swapping', i, j]);
        // change height
        sequence.push(['swapping', [i, j], [array[j], array[i]]]);
        // change color after swapping
        // sequence.push(['swapping', [i, j], [array[j], array[i]]]);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
  };
  // swap pivot with element at j
  // change color before swapping
  // sequence.push(['swappingPivot', first, j]);
  // change height
  sequence.push(['swappingPivot', [first, j], [array[j], array[first]]]);
  // change color after swapping
  // sequence.push(['swappingPivot', [first, j], [array[j], array[first]]]);
  array[first] = array[j];
  array[j] = pivot;

  return j;
}
