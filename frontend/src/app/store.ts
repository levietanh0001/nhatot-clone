import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


import counterReducer from "~/features/counter/counterSlice";
import loremReducer from "~/features/lorem/loremSlice";
import { useDispatch } from "react-redux";
import postProductReducer from "~/features/post-product/postProductSlice";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from "redux-persist/es/stateReconciler/hardSet";

// persisted reducers
const persistedPostProductReducer = persistReducer({
  key: 'postProduct',
  storage: storageSession,
  blacklist: ['']
}, postProductReducer);


const persistedCounterReducer = persistReducer({
  key: 'counter',
  storage: storageSession,
  blacklist: [''],
  
}, counterReducer);

// combine reducers/ persisted reducers into rootReducer
const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
  stateReconciler: hardSet,
  blacklist: ['counter', 'lorem']
}

const rootReducer = combineReducers({
  // counter: persistedCounterReducer,
  postProduct: postProductReducer,
  counter: counterReducer,
  lorem: loremReducer,
  // postProduct: persistedPostProductReducer
})

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    lorem: loremReducer,
    postProduct: postProductReducer
  },
  // reducer: persistedReducer,
  devTools: !process.env.NODE_ENV.includes('prod'),
  middleware: [thunk] // intercept and stop non-serializable values in action before they get to the reducer
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);