import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import { all } from 'redux-saga/effects';

// #. 루트 리듀서
const rootReducer = combineReducers({
  auth,
  loading,
});

// #. redux-saga
export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
