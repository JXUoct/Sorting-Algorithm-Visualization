export default function getAnimation(array) {
    let sequence = [];
    let N = array.length;
    countSort(array, N, sequence);
    sequence.push(['completed']);
    return [sequence, array];
}

const countSort = (array, N, sequence) => {
    let B = 10; // number  of buckets
    let counts = new Array(B).fill(0);
    // let tempArray = new Array(N);
    for (let i = 0; i < N; i++) {
        counts[array[i]]++;
        // console.log([i, array[i], counts[array[i]]]);
        sequence.push(['array-removing', i, array[i]]);
        sequence.push(['bucket-counting', array[i], counts[array[i]]]);
    };
    let i = N - 1;
    while (i >= 0) {
        for (let b = B - 1; b >= 0; b--) {
            while (counts[b] > 0) {
                array[i] = b;
                counts[b]--;
                sequence.push(['placing', i, b, counts[b]]);
                i--;
            };
        };
    };
    return array;
}
