import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setSortComplete } from '../../../features/sort/sortSlice';
import getAnimation from './getAnimation';

const QuickSortAnimation = () => {
    const {values} = useSelector(store => store.data);
    const array = values.slice();
    const {sortComplete} = useSelector(store => store.sort);
    const {interval} = useSelector(store => store.speed);
    const {mainColor, sortedColor, comparingColor, highlightingColor} = useSelector(store => store.color);
    const dispatch = useDispatch();
    const leftPartColor = 'red';
    const rightPartColor = 'blue';

    const handleClick = () => {
        if (!sortComplete) {
            const [sequence] = getAnimation(array);
            const bars = document.getElementsByClassName('chart-bar');
            const message = document.getElementsByClassName('status-message');

            for (let i = 0; i < sequence.length; i++) {
                if (sequence[i][0] === 'partition') {
                    const [p] = sequence[i][1];
                    const [l] = sequence[i][2];
                    setTimeout(() => {
                        message[0].innerText = `partitioning with pivot (orange)`;
                        bars[p].style.backgroundColor = highlightingColor;
                        for (let j = p + 1; j <= l; j++) {
                            bars[j].style.backgroundColor = mainColor;
                        }
                    }, i * interval);
                };
                if (sequence[i][0] === 'left') {
                    const b = sequence[i][1];
                    setTimeout(() => {
                        bars[b].style.backgroundColor = leftPartColor;
                    }, i * interval);
                };
                if (sequence[i][0] === 'right') {
                    const b = sequence[i][1];
                        setTimeout(() => {
                            bars[b].style.backgroundColor = rightPartColor;
                        }, i * interval);
                };
                if (sequence[i][0].startsWith('swapping')) {
                    setTimeout(() => {
                        if (sequence[i][0] !== 'swappingPivot') {
                            bars[b1].style.backgroundColor = comparingColor;
                        };
                        bars[b2].style.backgroundColor = comparingColor;
                    }, (i - 1/3) * interval);
                    const [b1, b2] = sequence[i][1];
                    const [newHeight1, newHeight2] = sequence[i][2];
                    setTimeout(() => {
                        bars[b1].style.height = `${newHeight1}px`;
                        bars[b2].style.height = `${newHeight2}px`;
                    }, i * interval);
                    setTimeout(() => {
                        bars[b1].style.backgroundColor = leftPartColor;
                        bars[b2].style.backgroundColor = sequence[i][0] !== 'swappingPivot' ? rightPartColor : sortedColor;
                    }, (i + 1/3) * interval);
                };
                if (sequence[i][0] === 'sorted') {
                    const b = sequence[i][1];
                    setTimeout(() => {
                        message[0].innerText = 'pivot at final position';
                        bars[b].style.backgroundColor = sortedColor;
                    }, i * interval);
                };
                if (sequence[i][0] === 'completed') {
                    setTimeout(() => {
                        message[0].innerText = 'quick sort completed';
                        for (let i = 0; i < array.length; i++) {
                            bars[i].style.backgroundColor = sortedColor;
                        };
                        dispatch(setSortComplete(true));
                    }, i * interval);
                };
            };
        };
    };

  return (
    <div>
        <button onClick={handleClick}>Quick sort</button>
    </div>
  )
}

export default QuickSortAnimation;
