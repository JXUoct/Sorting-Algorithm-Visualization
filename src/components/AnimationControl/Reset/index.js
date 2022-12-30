import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setSortComplete } from '../../../features/sort/sortSlice';

const Reset = () => {
    const array = useSelector(store => store.data.values);
    const {sortComplete} = useSelector(store => store.sort);
    const {mainColor} = useSelector(store => store.color);
    const {category} = useSelector(state => state.sort);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (sortComplete) {
            const message = document.getElementsByClassName('status-message');
            message[0].innerText = 'Waiting to be sorted';
            const bars = document.getElementsByClassName('chart-bar');
            const tableValues = document.getElementsByClassName('table-value');
            if (category !== 'distributionSorts') {
                for (let i = 0; i < array.length; i++) {
                    bars[i].style.backgroundColor = mainColor;
                    bars[i].style.height = `${array[i]}px`;
                };
            } else {
                for (let t = 0; t < array.length; t++) {
                    tableValues[t].style.backgroundColor = mainColor;
                    tableValues[t].style.color = 'black';
                    tableValues[t].innerText = array[t];
                };
            };
            dispatch(setSortComplete(false));
        };
    };

  return (
    <div>
        <button onClick={handleClick}>Reset</button>
    </div>
  )
}

export default Reset
