import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAction extends PayloadAction<number> {};

const initialState = {
  value: 0
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: () => {
      return initialState;
    },
    incrementBy: (state, action: IAction) => {
      state.value = state.value + action.payload;
    },
    decrementBy: (state, action: IAction) => {
      state.value = state.value - action.payload;
    },
  },
});

const counterReducer = counterSlice.reducer;


export const { 
  increment, 
  decrement, 
  incrementBy, 
  decrementBy, 
  reset 
} = counterSlice.actions;

export default counterReducer;
