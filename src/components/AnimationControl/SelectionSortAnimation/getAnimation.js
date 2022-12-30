export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    selectionSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const selectionSort = (array, N, sequence) => {
    for (let i = 0; i < N; i++) {
        const minIndex = minSelection(array, i, N, sequence);
        if (i !== minIndex) {
            // changing color
            sequence.push(['swapping', [i, minIndex], [array[minIndex],array[i]]]);
            // changing height
            sequence.push(['swapping', [i, minIndex], [array[minIndex],array[i]]]);
            // changing color
            sequence.push(['swapping', [i, minIndex], [array[minIndex],array[i]]]);
            swap(array, i, minIndex);
        };
        sequence.push(['added', i, array[i]]);
    };
    return array;
}

function minSelection(array, i, N, sequence) {
    let minIndex = i;
    for (let j = i + 1; j < N; j++) {
        // changing color
        sequence.push(['selecting-shifting', minIndex, j]);
        if (array[j] < array[minIndex]) {
            sequence.push(['selecting-swapping', j, minIndex]);
            minIndex = j;
        } else {
            // changing color
            sequence.push(['selecting-shifting', minIndex, j]);
        }
    };
    return minIndex;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
