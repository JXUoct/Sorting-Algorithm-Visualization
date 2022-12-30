import React from 'react'
import { useSelector} from 'react-redux'
import InsertionSortAnimation from './InsertionSortAnimation';
import SelectionSortAnimation from './SelectionSortAnimation';
import MergeSortAnimation from './MergeSortAnimation'
import QuickSortAnimation from './QuicksortAnimation';
import HeapsortAnimation from './HeapsortAnimation';
import ShellSortAnimation from './ShellSortAnimation';
import BubbleSortAnimation from './BubbleSortAnimation';
import CombSortAnimation from './CombSortAnimation';
import CountSortAnimation from './CountSortAnimation';
import BucketSortAnimation from './BucketSortAnimation';
import RadixSortAnimation from './RadixSortAnimation';
import Reset from './Reset';
import './animationControl.css';

export default function AnimationControl() {
    const {category} = useSelector(state => state.sort);

  return (
    <div className='animationControl-container'>
        { category === 'simpleSorts' && <InsertionSortAnimation />}
        { category === 'simpleSorts' && <SelectionSortAnimation />}
        { category === 'efficientSorts' && <MergeSortAnimation />}
        { category === 'efficientSorts' && <QuickSortAnimation />}
        { category === 'efficientSorts' && <HeapsortAnimation />}
        { category === 'efficientSorts' && <ShellSortAnimation />}
        { category === 'bubbleSorts' && <BubbleSortAnimation />}
        { category === 'bubbleSorts' && <CombSortAnimation />}
        { category === 'distributionSorts' && <CountSortAnimation />}
        { category === 'distributionSorts' && <BucketSortAnimation />}
        { category === 'distributionSorts' && <RadixSortAnimation />}
        <Reset />
    </div>
  )
}
