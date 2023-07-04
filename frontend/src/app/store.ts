import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "~/features/counter/counterSlice";
import { loremReducer } from "~/features/lorem/loremSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
  // reducers
  reducer: {
    counter: counterReducer,
    lorem: loremReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();


// // // Infer the `RootState` and `AppDispatch` types from the store itself
// type RootState = ReturnType<typeof store.getState>;
// // // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// type AppDispatch = typeof store.dispatch;

// export { 
//   store, 
//   type RootState, 
//   type AppDispatch 
// };
