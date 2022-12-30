export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    bucketSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const bucketSort = (array, N, sequence) => {
    let B = 10; // number  of buckets
    let buckets = [...new Array(B)].map(() => []);
    const max = Math.max(...array);
    for (let i = 0; i < N; i++) {
        let b = Math.floor((array[i] / (max + 1) * B));
        buckets[b].push(array[i]);
        let n = buckets[b].length;
        sequence.push(['array-removing', i, array[i]]);
        sequence.push(['bucket-adding', b, array[i], n]);
        if ( n > 1) {
            insertion(buckets[b], n - 1, b, sequence);
        };
    };
    let i = N - 1;
    while (i >= 0) {
        for (let b = B - 1; b >= 0; b--) {
            let n = buckets[b].length;
            for (let j = n - 1; j >= 0; j--) {
                sequence.push(['bucket-emptying', b, j]);
                sequence.push(['array-adding', i, buckets[b][j]]);
                array[i] = buckets[b][j];
                i--;
            };
        };
    };
    return array;
}

function insertion(array, i, b, sequence) {
    while (i > 0 && array[i] < array[i - 1]) {
        sequence.push(['bucket-inserting', [i, i - 1], [array[i - 1], array[i]], b])
        swap(array, i, i - 1);
        i--;
    };
    return;
  }

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
