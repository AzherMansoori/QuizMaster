import { all, fork } from 'redux-saga/effects';

import categorySagas from './sagas/categorySagas';

export default function* rootSaga() {
  yield all([
    yield fork(categorySagas),
  ]);
}