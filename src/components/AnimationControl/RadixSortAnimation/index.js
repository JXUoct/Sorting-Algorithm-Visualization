import getAnimation from "./getAnimation";
import { useSelector, useDispatch } from "react-redux";
import { setSortComplete } from '../../../features/sort/sortSlice';

export default function RadixSortAnimation() {
    const {values} = useSelector(store => store.data);
    const array = values.slice();
    const {sortComplete} = useSelector(store => store.sort);
    const {interval} = useSelector(store => store.speed);
    const {mainColor, sortedColor, highlightingColor, bucketColor} = useSelector(store => store.color);
    const dispatch = useDispatch();

    const handleClick = () => {
      if (!sortComplete) {
        const [sequence] = getAnimation(array);
        const message = document.getElementsByClassName('status-message');
        const tableValues = document.getElementsByClassName('table-value');
        const buckets = document.getElementsByClassName('buckets-bucket-container');

        for (let i = 0; i < sequence.length; i++) {
          if (sequence[i][0] === 'finding') {
            const [maxIndex, maxValue, D] = sequence[i].slice(1);
            setTimeout(() => {
              message[0].innerText = `finding the max(${maxValue}) and its number of digits(${D})`;
              tableValues[maxIndex].style.color = highlightingColor;
            }, i * interval);
            setTimeout(() => {
              tableValues[maxIndex].style.color = 'black';
            }, (i + 1/3) * interval);
          };
          if (sequence[i][0] === 'array-removing') {
            const [t, d] = sequence[i].slice(1);
            setTimeout(() => {
              message[0].innerText = `placing elements into buckets according to digit ${d + 1} from right`;
              tableValues[t].style.backgroundColor = highlightingColor;
            }, i * interval);
            setTimeout(() => {
              tableValues[t].style.backgroundColor = mainColor;
              tableValues[t].style.color = mainColor;
            }, (i + 1/3) * interval);
          };
          if (sequence[i][0] === 'bucket-adding') {
            const newDiv = document.createElement('div');
            newDiv.className = 'bucket-value';
            const [b, value, d] = sequence[i].slice(1);
            newDiv.innerText = value;
            newDiv.key = `bucket-${b}-${d}`;
            newDiv.style.backgroundColor = highlightingColor;
            setTimeout(() => {
              buckets[b].appendChild(newDiv);
            }, i * interval);
            setTimeout(() => {
              newDiv.style.backgroundColor =bucketColor;
            }, (i + 1/3) * interval);
          };
          if (sequence[i][0] === 'bucket-emptying') {
            const [b, j] = sequence[i].slice(1);
            const bucketValues = buckets[b].getElementsByClassName('bucket-value');
            setTimeout(() => {
              message[0].innerText = 'placing elements back to array';
              bucketValues[j].style.backgroundColor = highlightingColor;
            }, i * interval);
            setTimeout(() => {
              const elementToRemove = bucketValues[j];
              elementToRemove.remove();
            }, (i + 1/3) * interval);
          };
          if (sequence[i][0] === 'array-adding') {
            const [t, value, d, D] = sequence[i].slice(1);
            setTimeout(() => {
              const newColor = d === (D - 1) ? sortedColor : mainColor;
              tableValues[t].style.backgroundColor = newColor;
              tableValues[t].innerText = value;
              tableValues[t].style.color = 'white';
            }, i * interval);
          };
          if (sequence[i][0] === 'completed') {
            setTimeout(() => {
              message[0].innerText = 'radix sort completed';
              for (let t = 0; t < array.length; t++) {
                tableValues[t].style.backgroundColor = sortedColor;
              };
              dispatch(setSortComplete(true));
            }, i * interval);
          };
        };
    };
  }

  return (
    <div>
        <button onClick={handleClick}>Radix sort</button>
    </div>
  )
}
