import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';

// middlewares
const middlewareConfig = { serializableCheck: false };

export const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   // counter: counterReducer,
  //   // lorem: loremReducer,
  //   product: productReducer,
  //   userProfile: userProfileReducer,
  // },
  // reducer: persistedReducer,
  devTools: !process.env.NODE_ENV.includes('prod'),
  middleware: (getDefaultMiddleware) => {
    return !process.env.NODE_ENV.includes(`prod`)? 
           getDefaultMiddleware(middlewareConfig).concat(logger).concat(createSagaMiddleware()): 
           getDefaultMiddleware(middlewareConfig);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
