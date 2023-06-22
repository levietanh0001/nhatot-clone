import { createSlice } from "@reduxjs/toolkit";


export interface IInitialLorem {
  value: string;
}

const initialState = {
  value: 'loremipsum'
}

const loremSlice = createSlice({
  name: "lorem",
  initialState,
  reducers: {
    more: (state) => {
      state.value = state.value + ' ' + initialState.value;
    },
    less: (state) => {
      const stringArr = state.value.split(' ');
      const result = stringArr.slice(0, -1);
      state.value = result.length === 0? initialState.value: result.join(' ');
    }
  }
})

const loremReducer = loremSlice.reducer;

export const { more, less } = loremSlice.actions;
export { loremReducer };
