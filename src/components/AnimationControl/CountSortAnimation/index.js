import { useSelector, useDispatch } from "react-redux";
import { setSortComplete } from '../../../features/sort/sortSlice';
import getAnimation from './getAnimation';

export default function CountSortAnimation() {
  const {values, range} = useSelector(store => store.data);
  const {sortComplete} = useSelector(store => store.sort);
  const {interval} = useSelector(store => store.speed);
  const {mainColor, sortedColor, highlightingColor, bucketColor} = useSelector(store => store.color);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!sortComplete && range === "10") {
      const array = values.slice();
      const [sequence] = getAnimation(array);
      const message = document.getElementsByClassName('status-message');
      const tableValues = document.getElementsByClassName('table-value');
      const buckets = document.getElementsByClassName('buckets-bucket-container');
      for (let b = 0; b < buckets.length; b++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'bucket-count';
        newDiv.innerText = 0;
        newDiv.key = `bucket-${b}-count`;
        newDiv.style.color = 'black';
        newDiv.style.fontWeight = 'bold';
        newDiv.style.textAlign = 'right';
        buckets[b].appendChild(newDiv);
      };

      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i][0] === 'array-removing') {
          const [t] = sequence[i].slice(1);
          setTimeout(() => {
            message[0].innerText = 'counting occurences of each value';
            tableValues[t].style.backgroundColor = highlightingColor;
          }, i * interval);
          setTimeout(() => {
            tableValues[t].style.backgroundColor = mainColor;
            tableValues[t].style.color = mainColor;
          }, (i + 1/3) * interval);
        };
        if (sequence[i][0] === 'bucket-counting') {
          const [b, count] = sequence[i].slice(1);
          setTimeout(() => {
            buckets[b].children[1].style.color = highlightingColor;
          }, (i - 1/3) * interval);
          setTimeout(() => {
            buckets[b].children[1].innerText = count;
            buckets[b].children[1].style.width = `${count * 40}px`;
            buckets[b].children[1].style.backgroundColor = bucketColor;
          }, i * interval);
          setTimeout(() => {
            buckets[b].children[1].style.color = 'black';
          }, (i + 1/3) * interval);
        };
        if (sequence[i][0] === 'placing') {
          const [t, b, newCount] = sequence[i].slice(1);
          setTimeout(() => {
            message[0].innerText = 'placing elements back to array';
            buckets[b].children[1].style.color = highlightingColor;
          }, (i - 1/3) * interval);
          setTimeout(() => {
            tableValues[t].innerText = b;
            tableValues[t].style.color = 'white';
            buckets[b].children[1].innerText = newCount;
            buckets[b].children[1].style.width = `${newCount * 40}px`;
          }, i * interval);
          setTimeout(() => {
            tableValues[t].style.backgroundColor = sortedColor;
            buckets[b].children[1].style.color = 'black';
          }, (i + 1/3) * interval);
        };
        if (sequence[i][0] === 'completed') {
          setTimeout(() => {
            message[0].innerText = 'count sort completed';
            for (let b = 0; b < buckets.length; b++) {
              const elementToRemove = buckets[b].children[1];
              elementToRemove.remove();
            };
            dispatch(setSortComplete(true));
          }, i * interval);
        };
      };
    };
  };

  return (
    <div className="countSort-btn-container">
      <button onClick={handleClick}>Count sort</button>
      <div className="tooltip">Data range needs to be 0 - 10</div>
    </div>
  )
}
