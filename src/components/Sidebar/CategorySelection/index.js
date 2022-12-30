import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../../features/sort/sortSlice';
// import { useSelector } from 'react-redux';
import './categorySelection.css';

export default function CategorySelection() {
    const dispatch = useDispatch();
    // const {category} = useSelector(state => state.sort)
    function handleChange(e) {
        dispatch(setCategory(e.target.value));
    }
    // console.log(category);

  return (
    <div className='category-container'>
        <div>
          <h3>Categories</h3>
        </div>
        <div>
          <input
            type="radio"
            id='simpleSorts'
            name="category"
            value="simpleSorts"
            onChange={handleChange}
          />
          <label htmlFor="simpleSorts">Simple Sorts</label>
        </div>
        <div>
        </div>
          <input
            type="radio"
            id='efficientSorts'
            name="category"
            value="efficientSorts"
            onChange={handleChange}
            // checked="checked"
          />
          <label htmlFor="efficientSorts">Efficient Sorts</label>
        <div>
          <input
            type="radio"
            id='bubbleSorts'
            name="category"
            value="bubbleSorts"
            onChange={handleChange}
          />
          <label htmlFor="bubbleSorts">Bubble Sorts</label>
        </div>
        <div>
          <input
            type="radio"
            id='distributionSorts'
            name="category"
            value="distributionSorts"
            onChange={handleChange}
          />
          <label htmlFor="distributionSorts">Distribution Sorts</label>
        </div>
    </div>
  )
}
