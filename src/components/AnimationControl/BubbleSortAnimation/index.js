import getAnimation from "./getAnimation";
import { useSelector, useDispatch } from "react-redux";
import { setSortComplete } from '../../../features/sort/sortSlice';

export default function BubbleSortAnimation() {
    const {values} = useSelector(store => store.data);
    const array = values.slice();
    const {sortComplete} = useSelector(store => store.sort);
    const {interval} = useSelector(store => store.speed);
    const {mainColor, sortedColor, comparingColor} = useSelector(store => store.color);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (!sortComplete) {
            const [sequence] = getAnimation(array);
            const bars = document.getElementsByClassName('chart-bar');
            const message = document.getElementsByClassName('status-message');

            for (let i = 0; i < sequence.length; i++) {
                if (sequence[i][0] === 'iterating') {
                    setTimeout(() => {
                        message[0].innerText = `looping through the array ( # of times: ${sequence[i][1]})`;
                    }, i * interval);
                }
                if (sequence[i][0] === 'swapping') {
                    const [b1, b2] = sequence[i][1];
                    const [newHeight1, newHeight2] = sequence[i][2];
                    setTimeout(() => {
                        bars[b1].style.backgroundColor = comparingColor;
                        bars[b2].style.backgroundColor = comparingColor;
                    }, (i - 1/3) * interval);
                    setTimeout(() => {
                        bars[b1].style.height = `${newHeight1}px`;
                        bars[b2].style.height = `${newHeight2}px`;
                    }, i * interval);
                    setTimeout(() => {
                        bars[b1].style.backgroundColor = mainColor;
                        bars[b2].style.backgroundColor = mainColor;
                    }, (i + 1/3) * interval);
                };
                if (sequence[i][0] === 'sorted') {
                    const b = sequence[i][1];
                    setTimeout(() => {
                        bars[b].style.background = sortedColor;
                    }, i * interval);
                };
                if (sequence[i][0] === 'completed') {
                    setTimeout(() => {
                        message[0].innerText = 'bubble sort completed';
                        for (let b = 0; b < array.length; b++) {
                            bars[b].style.backgroundColor = sortedColor;
                        }
                        dispatch(setSortComplete(true));
                    }, i * interval);
                };
            };
        };
    }

  return (
    <div>
        <button onClick={handleClick}>Bubble sort</button>
    </div>
  )
}
