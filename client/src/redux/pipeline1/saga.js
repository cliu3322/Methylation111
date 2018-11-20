import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';


export default function* rootSaga() {
  console.log('saga root');
  yield all([]);
}
