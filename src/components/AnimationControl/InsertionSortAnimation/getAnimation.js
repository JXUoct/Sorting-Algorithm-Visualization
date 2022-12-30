export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    insertionSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const insertionSort = (array, N, sequence) => {
    for (let i = 0; i < N; i++) {
        sequence.push(['iterating', i, array[i]]);
        insertion(array, i, sequence);
    };
    return array;
}

function insertion(array, i, sequence) {
    while (i > 0 && array[i] < array[i - 1]) {
        sequence.push(['inserting', [i, i - 1], [array[i - 1], array[i]]])
        swap(array, i, i - 1);
        i--;
    };
    sequence.push(['inserted', i, array[i]]);
    return;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
