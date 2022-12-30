import getAnimation from "./getAnimation";
import { useSelector, useDispatch } from "react-redux";
import { setSortComplete } from '../../../features/sort/sortSlice';

export default function SelectionSortAnimation() {
    const {values} = useSelector(store => store.data);
    const array = values.slice();
    const {sortComplete} = useSelector(store => store.sort);
    const {interval} = useSelector(store => store.speed);
    const {mainColor, sortedColor, comparingColor, highlightingColor} = useSelector(store => store.color);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (!sortComplete) {
            const [sequence] = getAnimation(array);
            const bars = document.getElementsByClassName('chart-bar');
            const message = document.getElementsByClassName('status-message');

            for (let i = 0; i < sequence.length; i++) {
                if (sequence[i][0].startsWith('selecting')) {
                    setTimeout(() => {
                        message[0].innerText = 'selecting the smallest number';
                    }, i * interval);

                    const k = i;
                    while (sequence[i][0].startsWith('selecting')) {
                        if ((i - k) % 2 === 0) {
                            const [b1, b2] = sequence[i].slice(1);
                            setTimeout(() => {
                                bars[b1].style.backgroundColor = highlightingColor;
                                bars[b2].style.backgroundColor = comparingColor;
                            }, i * interval);
                        };
                        if ((i - k) % 2 === 1) {
                            if (sequence[i][0] === 'selecting-swapping') {
                                const [b1, b2] = sequence[i].slice(1);
                                setTimeout(() => {
                                    bars[b1].style.backgroundColor = highlightingColor;
                                    bars[b2].style.backgroundColor = mainColor;
                                }, i * interval);
                            } else {
                                const [b2] = sequence[i].slice(1);
                                setTimeout(() => {
                                    bars[b2].style.backgroundColor = mainColor;
                                }, i * interval);
                            }
                        };
                        i++;
                    }
                };
                if (sequence[i][0] === 'swapping') {
                    const k = i;
                    while (sequence[i][0] === 'swapping') {
                        setTimeout(() => {
                            message[0].innerText = 'adding to the sorted section';
                        }, i * interval);

                        if ((i - k) % 3 === 0) {
                            const [b1] = sequence[i][1];
                            setTimeout(() => {
                                bars[b1].style.backgroundColor = comparingColor;
                            }, i * interval);
                        };
                        if ((i - k) % 3 === 1) {
                            const [b1, b2] = sequence[i][1];
                            const [newHeight1, newHeight2] = sequence[i][2];
                            setTimeout(() => {
                                bars[b1].style.backgroundColor = highlightingColor;
                                bars[b2].style.backgroundColor = comparingColor;
                                bars[b1].style.height = `${newHeight1}px`;
                                bars[b2].style.height = `${newHeight2}px`;
                            }, i * interval);
                        };
                        if ((i - k) % 3 === 2) {
                            const [b2] = sequence[i][1];
                            setTimeout(() => {
                                bars[b2].style.backgroundColor = mainColor;
                            }, i * interval);
                        };
                        i++;
                    }
                };
                if (sequence[i][0] === 'added') {
                    const b = sequence[i][1];
                    setTimeout(() => {
                        message[0].innerText = 'adding to the sorted section';
                        bars[b].style.backgroundColor = sortedColor;
                    }, i * interval);
                };
                if (sequence[i][0] === 'completed') {
                    setTimeout(() => {
                        message[0].innerText = 'selection sort completed';
                        dispatch(setSortComplete(true));
                    }, i * interval);
                };
            };
        }
    }

  return (
    <div>
        <button onClick={handleClick}>Selection sort</button>
    </div>
  )
}
