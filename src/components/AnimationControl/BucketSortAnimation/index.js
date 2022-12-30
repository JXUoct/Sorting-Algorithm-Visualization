import getAnimation from "./getAnimation";
import { useSelector, useDispatch } from "react-redux";
import { setSortComplete } from '../../../features/sort/sortSlice';

export default function CountSortAnimation() {
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
          if (sequence[i][0] === 'array-removing') {
            const [t] = sequence[i].slice(1);
            setTimeout(() => {
              message[0].innerText = 'placing elements into buckets';
              tableValues[t].style.backgroundColor = highlightingColor;
            }, i * interval);
            setTimeout(() => {
              tableValues[t].style.backgroundColor = mainColor;
              tableValues[t].style.color = mainColor;
            }, (i + 1/3) * interval);
          };
          if (sequence[i][0] === 'bucket-adding') {
            const [b, value, n] = sequence[i].slice(1);
            const newDiv = document.createElement('div');
            newDiv.className = 'bucket-value';
            newDiv.innerText = value;
            newDiv.key = `bucket-${b}-${n}`;
            newDiv.style.backgroundColor = highlightingColor;
            setTimeout(() => {
              buckets[b].appendChild(newDiv);
            }, i * interval);
            setTimeout(() => {
              newDiv.style.backgroundColor =bucketColor;
            }, (i + 1/3) * interval);
          };
          if (sequence[i][0] === 'bucket-inserting') {
            const [b1, b2] = sequence[i][1];
            const [newText1, newText2] = sequence[i][2];
            const b = sequence[i][3];
            const bucketValues = buckets[b].getElementsByClassName('bucket-value');
            setTimeout(() => {
              message[0].innerText = 'inserting';
              bucketValues[b1].style.color = highlightingColor;
              bucketValues[b2].style.color = highlightingColor;
            }, (i - 1/3) * interval);
            setTimeout(() => {
              bucketValues[b1].innerText = newText1;
              bucketValues[b2].innerText = newText2;
            }, i * interval);
            setTimeout(() => {
              bucketValues[b1].style.color = 'black';
              bucketValues[b2].style.color = 'black';
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
            const [t, value] = sequence[i].slice(1);
            setTimeout(() => {
              tableValues[t].style.backgroundColor = sortedColor;
              tableValues[t].innerText = value;
              tableValues[t].style.color = 'white';
            }, i * interval);
          };
          if (sequence[i][0] === 'completed') {
            setTimeout(() => {
              message[0].innerText = 'bucket sort completed';
              dispatch(setSortComplete(true));
            }, i * interval);
          };
        };
    };
  }

  return (
    <div>
        <button onClick={handleClick}>Bucket sort</button>
    </div>
  )
}
