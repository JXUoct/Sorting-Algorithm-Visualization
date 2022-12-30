
export default function getAnimation(array) {
    let sequence = [];
    let auxArr = array.slice(0);
    let len = array.length;
    mergeSort(array, 0, len - 1, auxArr, sequence);
    sequence.push(['completed']);
    return [sequence, array];
};

function mergeSort(array, start, end, auxArr, sequence) {
    if (start === end) return;
    let mid = Math.floor((start + end) / 2);
    // animate the divide process:
    sequence.push(['leftHalf', start, mid]);
    sequence.push(['rightHalf', mid + 1, end]);

    mergeSort(auxArr, start, mid, array, sequence);
    mergeSort(auxArr, mid + 1, end, array, sequence);
    merge(auxArr, start, mid, end, array, sequence);
    return sequence;
};

function merge(auxArr, start, mid, end, array, sequence) {
    sequence.push(['mergingLeft', start, mid]);
    sequence.push(['mergingRight', mid + 1, end]);
    let i = start;
    let p1 = start;  // auxArr[start, mid + 1]
    let p2 = mid + 1;    // auxArr[mid + 1, end + 1]
    while (p1 <= mid && p2 <= end) {
        sequence.push(['comparing', p1, p2]);
        sequence.push(['comparing', p1, p2]);
        if (auxArr[p1] <= auxArr[p2]) {
            sequence.push(['comparing', i, auxArr[p1]]);
            array[i++] = auxArr[p1++];
            // i++;
            // p1++;
        } else {
            array[i] = auxArr[p2];
            sequence.push(['comparing', i, auxArr[p2]]);
            array[i++] = auxArr[p2++];
            // i++;
            // p2++;
        };
    };
    while (p1 <= mid) {
        sequence.push(['comparing', p1, p1]);
        sequence.push(['comparing', p1, p1]);
        sequence.push(['comparing', i, auxArr[p1]]);
        array[i++] = auxArr[p1++];
        // i++;
        // p1++;
    };
    while (p2 <= end) {
        sequence.push(['comparing', p2, p2]);
        sequence.push(['comparing', p2, p2]);
        sequence.push(['comparing', i, auxArr[p2]]);
        array[i++] = auxArr[p2++];
        // i++;
        // p2++;
    };
};
