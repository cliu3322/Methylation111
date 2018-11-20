import { all, takeEvery, fork, put, call} from 'redux-saga/effects';
import actions from './actions';

export function* watchFetchDog() {
  yield takeEvery('FETCHED_DOG', fetchDogAsync);
}

export function* fetchDogAsync() {
  console.log('saga');
  try {
    yield put(actions.requestDog());
    const data = yield call(() => {
      return fetch('https://dog.ceo/api/breeds/image/random')
              .then(res => res.json())
      }
    );
    yield put(actions.requestDogSuccess(data));
  } catch (error) {
    yield put(actions.requestDogError());
  }
}

export default function* rootSaga() {
  yield all([fork(fetchDogAsync)]);
}
