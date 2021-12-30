import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { logger } from 'redux-logger';
import rootSaga from './rootSaga';
import { createStore, applyMiddleware, compose } from 'redux';
import {
    configureStore,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
//import { loadPersistedState, setupStoreObservers } from './utils/ReduxUtil';

// let sagaMiddleware = createSagaMiddleware();
// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

// const store = configureStore({
//     reducer: rootReducer,
//     middleware
// });

// sagaMiddleware.run(saga);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares, logger)];
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

//const persistedState = loadPersistedState();

export const store = createStore(
    rootReducer,
    // persistedState,
    composeEnhancers(...enhancers)
);

sagaMiddleware.run(rootSaga);