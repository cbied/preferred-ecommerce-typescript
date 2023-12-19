import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

type ExtenedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
  blacklist: (keyof RootState)[];
}

const persistConfig: ExtenedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  // user comes from auth state listener in Firebase
  // categories is using redux thunk/loading page
  blacklist: ['user', 'categories'],
}

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)
// React Redux chrome extenstion

// Redux logger middleware
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    // thunk,
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware))

const composedEnhancer = 
      (process.env.NODE_ENV !== 'production' && 
      window && 
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;
  
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)


