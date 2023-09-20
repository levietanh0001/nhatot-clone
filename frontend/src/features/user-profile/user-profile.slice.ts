import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: {
    avatarImage: null
  }
};


const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setAvatarImage: (state, action) => {
      state.value.avatarImage = action.payload;
    }
  },

});


const userProfileReducer = userProfileSlice.reducer;


export default userProfileReducer;
export const { setAvatarImage } = userProfileSlice.actions;