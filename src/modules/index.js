import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';

// #. 루트 리듀서
const rootReducer = combineReducers({
  auth,
  loading,
  user,
});

// #. redux-saga
export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
