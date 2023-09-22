import React from 'react'
import styles from './Counter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, decrementBy, increment, incrementBy, reset } from '@/features/counter/counter.slice'
import { RootState, useAppDispatch } from '@/app/store';

const Counter = () => {

  // const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className='counter'>
      {/* <p>{count}</p> */}
      <div className='row'>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(reset())}>reset</button>
        <button onClick={() => dispatch(incrementBy(2))}>increment by 2</button>
        <button onClick={() => dispatch(decrementBy(2))}>decrement by 2</button>
      </div>
    </div>
  )
}

export default Counter