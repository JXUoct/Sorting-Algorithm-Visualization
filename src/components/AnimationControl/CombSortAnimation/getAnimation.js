export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    combSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const combSort = (array, N, sequence) => {
    const shrink = 1.3;
    let gap = N;
    let swapped = true;
    while (swapped || gap > 1) {    // loop ends when gap = 1 and swapped is false
        gap = Math.floor(gap / shrink);
        if (gap < 1) gap = 1;
        swapped = false;
        sequence.push(['gap', gap]);
        for (let i = 0; i + gap < N; i++) {
            if (array[i] > array[i + gap]) {
                sequence.push(['swapping', [i, i + gap], [array[i + gap], array[i]]]);
                swap(array, i, i + gap);
                swapped = true;
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
