import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { logger } from 'redux-logger';

import counterReducer from '~/features/counter/counter.slice';
import loremReducer from '~/features/lorem/lorem.slice';
import productReducer from '~/features/products/product.slice';
import userProfileReducer from '~/features/products/user-profile.slice';


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


export default rootReducer;