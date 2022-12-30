import React from 'react';
import { useDispatch } from 'react-redux';
import { setDataSize, setDataRange, generateData } from '../../../features/data/dataSlice';

export default function NewDataGeneration() {
    const dispatch = useDispatch();
    function handleChange(e) {
      if (e.target.name === 'dataSize') {
        dispatch(setDataSize(e.target.value));
      };
      if (e.target.name === 'dataRange') {
        // console.log(e.target.value);
        dispatch(setDataRange(e.target.value));
      };
      dispatch(generateData());
    }

  return (
    <div className='newDataGeneration-container'>
        <div>
          <h3>New Random Data</h3>
        </div>
        <div className='dataSize-container'>
          <h4>Data Size</h4>
          <div>
            <input
              type="radio"
              id='size-small'
              name="dataSize"
              value='25'
              onChange={handleChange}
              // checked="checked"
            />
            <label htmlFor="size-small">25 Data Points</label>
          </div>
          <div>
            <input
              type="radio"
              id='size-medium'
              name="dataSize"
              value='50'
              onChange={handleChange}
            />
            <label htmlFor="size-medium">50 Data Points</label>
          </div>
          <div>
            <input
              type="radio"
              id='size-large'
              name="dataSize"
              value='100'
              onChange={handleChange}
            />
            <label htmlFor="size-large">100 Data Points</label>
          </div>
        </div>
      <div className='dataRange-container'>
        <h4>Data Range</h4>
            <div>
              <input
                type="radio"
                id='range-xsmall'
                name="dataRange"
                value='10'
                onChange={handleChange}
                // checked="checked"
              />
              <label htmlFor="range-xsmall">0 - 10</label>
            </div>
            <div>
              <input
                type="radio"
                id='range-small'
                name="dataRange"
                value='100'
                onChange={handleChange}
                // checked="checked"
              />
              <label htmlFor="range-small">0 - 100</label>
            </div>
            <div>
              <input
                type="radio"
                id='range-medium'
                name="dataRange"
                value='300'
                onChange={handleChange}
              />
              <label htmlFor="range-medium">0 - 300</label>
            </div>
            <div>
              <input
                type="radio"
                id='range-large'
                name="dataRange"
                value='500'
                onChange={handleChange}
              />
              <label htmlFor="range-large">0 - 500</label>
            </div>
      </div>
    </div>
  )
}
