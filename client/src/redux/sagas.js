import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import dogSagas from './dog/saga';
import pipeline1Sagas from './pipeline1/saga';
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    dogSagas(),
    pipeline1Sagas(),
  ]);
}
