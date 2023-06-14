import React from 'react'
import { useSelector } from 'react-redux'
import { less, more } from '../../features/lorem/loremSlice';
import { RootState, useAppDispatch } from '../../app/store';

const Lorem = () => {
  const currentLorem = useSelector((state: RootState) => state.lorem.value);

  const dispatch = useAppDispatch();

  return (
    <div>
      <p>{currentLorem}</p>
      <div className="row">
        <button onClick={() => dispatch(more())}>More</button>
        <button onClick={() => dispatch(less())}>Less</button>
      </div>
    </div>
  )
}

export default Lorem