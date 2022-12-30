export default function getAnimation(array) {
  let sequence = [];
  // let len = array.length;
  heapSort(array, sequence);
  sequence.push(['completed']);
  return [sequence, array];
}

const heapSort = (array, sequence) => {
    if (array.length < 2) return array;
    let N = array.length;
    // convert given array to a max heap
    // get index of first non-leaf node:
    let n = Math.floor(N / 2) - 1;
    sequence.push(['building']);
    for (let i = n; i >= 0; i--) {
      heapify(array, N, i, sequence);
    };
    // starting from right, swapping last element with first(largest) and maintain heap
    for (let i = N - 1; i >= 0; i--) {
      if (i === 0) sequence.push(['sorted', i, array[i]]);
      else {
        sequence.push(['removing', [0, i], [array[i], array[0]]]);
        let last = array[i];
        array[i] = array[0];
        array[0] = last;
        heapify(array, i, 0, sequence);   // heapify element 0 for the array with i elements;
      };
    };
    return array;
}

function heapify(array, N, i, sequence) {
    let l = 2 * i + 1;
    let r = l + 1;
    // element i has no children
    if (l > N - 1) return;
    // element i has a left child
    if (r > N - 1) {
      if (array[i] < array[l]) {
        swap(array, i, l, sequence);
        heapify(array, N, l, sequence);
      } else return;
    } else {
      if (array[l] >= array[r] && array[i] < array[l]) {
        swap(array, i, l, sequence);
        heapify(array, N, l, sequence);
      } else if (array[l] < array[r] && array[i] < array[r]) {
        swap(array, i, r, sequence);
        heapify(array, N, r, sequence);
      } else return;
    }
}

function swap(array, i, j, sequence) {
    sequence.push(['swapping', [i, j], [array[j], array[i]]]);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
