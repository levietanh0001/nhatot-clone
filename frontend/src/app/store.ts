import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

import counterReducer from '~/features/counter/counterSlice';
import loremReducer from '~/features/lorem/loremSlice';
import { useDispatch } from 'react-redux';
import productReducer from '~/features/products/productSlice';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import userProfileReducer from '~/features/products/userProfileSlice';


// persisted reducers
const persistedPostProductReducer = persistReducer(
  {
    key: 'product',
    storage: storageSession,
    blacklist: [''],
  },
  productReducer
);

const persistedCounterReducer = persistReducer(
  {
    key: 'counter',
    storage: storageSession,
    blacklist: [''],
  },
  counterReducer
);

// combine reducers/ persisted reducers into rootReducer
const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
  stateReconciler: hardSet, // deep copy
  blacklist: ['counter', 'lorem'],
};

const rootReducer = combineReducers({
  // counter: persistedCounterReducer,
  product: productReducer,
  userProfile: userProfileReducer,
  // counter: counterReducer,
  // lorem: loremReducer,
  // product: persistedPostProductReducer
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  rootPersistConfig,
  rootReducer
);


const { logger } = require(`redux-logger`);

const middlewareConfig = { serializableCheck: false };

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // lorem: loremReducer,
    product: productReducer,
    userProfile: userProfileReducer,
  },
  // reducer: persistedReducer,
  devTools: !process.env.NODE_ENV.includes('prod'),
  middleware: (getDefaultMiddleware) => {
    return !process.env.NODE_ENV.includes(`prod`)? getDefaultMiddleware(middlewareConfig).concat(logger): getDefaultMiddleware(middlewareConfig);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
