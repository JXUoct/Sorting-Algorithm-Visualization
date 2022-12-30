export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    bubbleSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const bubbleSort = (array, N, sequence) => {
    for (let i = 0; i < N; i++) {
        sequence.push(['iterating', i + 1]);
        let noSwap = true;
        let j = 0;
        while (j < N - 1 - i) {
            if (array[j] > array[j + 1]) {
                sequence.push(['swapping', [j, j + 1], [array[j + 1], array[j]]]);
                swap(array, j, j + 1);
                noSwap = false;
            };
            j++;
        };
        sequence.push(['sorted', j, array[j]]);
        if (noSwap) return array;
    };
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
