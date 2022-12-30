import { useSelector, useDispatch } from 'react-redux';
import { setSortComplete } from '../../../features/sort/sortSlice';
import getAnimation from './getAnimation';


export default function MergeSortAnimation() {
    const {values} = useSelector(store => store.data);
    const {sortComplete} = useSelector(store => store.sort);
    const {interval} = useSelector(store => store.speed);
    const {sortedColor, comparingColor} = useSelector(store => store.color);
    const dispatch = useDispatch();
    const array = values.slice();
    const dividingLeftColor = 'red';
    const dividingRightColor = 'blue';
    const mergingLeftColor = 'yellow';
    const mergingRightColor = 'orange';

    const handleClick = () => {
        if (!sortComplete) {
            const [sequence] = getAnimation(array);
            const bars = document.getElementsByClassName('chart-bar');
            const message = document.getElementsByClassName('status-message');

            for (let i = 0; i < sequence.length; i++) {
                if (sequence[i][0] === 'comparing') {
                    let k = i;
                    const start = sequence[k - 2].slice(1)[0];
                    const mid = sequence[k - 2].slice(1)[1];
                    const end = sequence[k - 1].slice(1)[1];
                    while (i < sequence.length && sequence[i][0] === 'comparing') {
                        if ((i - k) % 3 !== 2) {
                        const [p1, p2] = sequence[i].slice(1);
                        const mainColor1 = p1 <= mid ? mergingLeftColor : mergingRightColor;
                        const mainColor2 = p2 <= mid ? mergingLeftColor : mergingRightColor;
                        const newColor1 = (i - k) % 3 === 0 ? comparingColor : mainColor1;
                        const newColor2 = (i - k) % 3 === 0 ? comparingColor : mainColor2;
                        setTimeout(() => {
                            bars[p1].style.backgroundColor = newColor1;
                            bars[p2].style.backgroundColor = newColor2;
                        }, i * interval);
                        } else {
                        const [p, newHeight] = sequence[i].slice(1);
                        setTimeout(() => bars[p].style.height = `${newHeight}px`, i * interval);
                        };
                        i++;
                    };

                    // set colors for partially sorted state
                    setTimeout(() => {
                        for (let j = start; j <= end; j++) {
                        bars[j].style.backgroundColor = sortedColor;
                        };
                    }, i * interval);
                };

                if (i < sequence.length && sequence[i][0] === 'leftHalf') {
                    setTimeout(() => {
                        message[0].innerText = 'dividing';
                    }, i * interval);

                    const [start, end] = sequence[i].slice(1);
                    setTimeout(() => {
                        for (let j = start; j <= end; j++) {
                        bars[j].style.backgroundColor = dividingLeftColor;
                        };
                    }, i * interval);
                };

                if (i < sequence.length && sequence[i][0] === 'rightHalf') {
                    setTimeout(() => {
                        message[0].innerText = 'dividing';
                    }, i * interval);
                    const [start, end] = sequence[i].slice(1);
                    setTimeout(() => {
                        for (let j = start; j <= end; j++) {
                        bars[j].style.backgroundColor = dividingRightColor;
                        };
                    }, i * interval);
                };

                if (i < sequence.length && sequence[i][0].startsWith('merging')) {
                    setTimeout(() => {
                        message[0].innerText = 'merging'
                    }, i * interval);
                    const [start, end] = sequence[i].slice(1);
                    setTimeout(() => {
                        for (let j = start; j <= end; j++) {
                        bars[j].style.backgroundColor = sequence[i][0] === 'mergingLeft' ? mergingLeftColor : mergingRightColor;
                        };
                    }, i * interval);
                };
                if (sequence[i][0] === 'completed') {
                    setTimeout(() => {
                        message[0].innerText = 'merge sort completed';
                        dispatch(setSortComplete(true));
                    }, i * interval);
                };
            };
        };
    };

    return (
        <button onClick={handleClick}>Merge sort</button>
    )


}
