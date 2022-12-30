export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    shellSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const shellSort = (array, N, sequence) => {
    for (let gap = Math.floor(N / 2); gap >= 1; gap = Math.floor(gap / 2)) {
        sequence.push(['gap', gap]);
        for (let i = gap; i < N; i++) {
            for (let j = i - gap; j >= 0; j = j - gap) {
                if (array[j + gap] >= array[j]) {
                    break;
                } else {
                    sequence.push(['swapping', [j + gap, j], [array[j], array[j + gap]]]);
                    swap(array, j + gap, j);
                };
            };
        };
    };
    return array;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
