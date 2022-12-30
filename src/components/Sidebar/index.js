import CategorySelection from './CategorySelection';
import NewDataGeneration from './NewDataGeneration';
import SpeedControl from './SpeedControl';
import './sidebar.css';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-section1'>
        <CategorySelection />
      </div>
      <div className='sidebar-section2'>
        <NewDataGeneration />
      </div>
      <div className='sidebar-section3'>
        <SpeedControl />
      </div>
    </div>
  )
}
