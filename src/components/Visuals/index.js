import { useSelector } from "react-redux";
import './visuals.css';

export default function Visuals() {
  const array = useSelector(store => store.data.values);
  const {category} = useSelector(state => state.sort);
  const {size} = useSelector(state => state.data);
  const {mainColor, bucketColor} = useSelector(store => store.color);
  const buckets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="main-visual-container">
        {/* <div className="main-chart-container"> */}
      { category !== 'distributionSorts' &&
        <div className="main-chart-container">
          <div className='chart-container'>
          {
            array.map((num, i) => (
            <div
                className='chart-bar'
                key={i}
                style={{
                backgroundColor: mainColor,
                width: `${100 / size * 10}px`,
                height: `${num}px`,
                verticalAlign: 'bottom',
                }}>
            </div>
            ))
          }
          </div>
        </div>
      }
      {category === 'distributionSorts' &&
        <div className="main-table-container">
          <div className='table-container'>
          {
            array.map((num, i) => (
            <div className="table-column" key={`table-column-${i}`}>
              <div
              className="table-index"
              key={`table-index-${i}`}
              >
                {i}
              </div>
              <div className="table-value"
              key={`table-value-${i}`}>
                {num}
              </div>
            </div>
            ))
          }
          </div>
        </div>
      }
      {category === 'distributionSorts' &&
        <div className="main-buckets-container">
          <div className='buckets-container'>
          {
            buckets.map((num, i) => (
              <div className="buckets-bucket-container"
              key={`buckets-bucket-${i}`}
              >
                <div
                className="bucket-index"
                key = {`bucket-index-${i}`}
                style={{backgroundColor: bucketColor}}
                >{i}</div>
              </div>
              ))
          }
          </div>
        </div>
      }

      <div className='status-container'>
        <div className="status-message">
          Waiting to be sorted
        </div>
      </div>
    </div>
  )
}
