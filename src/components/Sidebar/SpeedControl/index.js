import React from 'react';
import { useDispatch } from 'react-redux';
import { setSpeed } from '../../../features/speed/speedSlice';

export default function NewDataGeneration() {
    const dispatch = useDispatch();
    function handleChange(e) {
        dispatch(setSpeed(e.target.value));
    }

  return (
    <div className='speedControl-container'>
      <h3>Animation Speed</h3>
      <div>
        <input
          type="radio"
          id='speed-fast'
          name="speed"
          value='fast'
          onChange={handleChange}
        />
        <label htmlFor="speed-fast">Fast</label>
      </div>
      <div>
        <input
          type="radio"
          id='speed-medium'
          name="speed"
          value='medium'
          onChange={handleChange}
        />
        <label htmlFor="speed-medium">Medium</label>
      </div>
      <div>
        <input
          type="radio"
          id='speed-slow'
          name="speed"
          value='slow'
          onChange={handleChange}
          // checked="checked"
        />
        <label htmlFor="speed-slow">Slow</label>
      </div>
    </div>
  )
}
