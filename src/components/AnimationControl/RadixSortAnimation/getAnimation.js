export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    radixSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const radixSort = (array, N, sequence) => {
    let B = 10; // number  of buckets
    const maxIndex = maxSelection(array, N);
    const maxValue = array[maxIndex];
    const D = String(maxValue).length; // number of digits for max
    sequence.push(['finding', maxIndex, maxValue, D]);
    for (let d = 0; d < D; d++) {
        const buckets = [...new Array(B)].map(() => []);
        for (let i = 0; i < N; i++) {
            let b = getDigit(array[i], d);
            buckets[b].push(array[i]);
            sequence.push(['array-removing', i, array[i], d]);
            sequence.push(['bucket-adding', b, array[i], d]);
        };
        let i = N - 1;
        while (i >= 0) {
            for (let b = B - 1; b >= 0; b--) {
                let n = buckets[b].length;
                for (let j = n - 1; j >= 0; j--) {
                    sequence.push(['bucket-emptying', b, j]);
                    sequence.push(['array-adding', i, buckets[b][j], d, D]);
                    array[i] = buckets[b][j];
                    i--;
                };
            };
        };
    };
    return array;
}

function maxSelection(array, N) {
    let maxIndex = 0;
    for (let j = 1; j < N; j++) {
        if (array[j] > array[maxIndex]) {
            maxIndex = j;
        };
    };
    return maxIndex;
}

function getDigit(num, d) {
    let numStr = num.toString();
    let N = numStr.length;
    if (d < N) {
        return numStr[N - 1 - d];
    } else return 0;
}
