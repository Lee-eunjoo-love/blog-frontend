import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

// #. 액션 타입
const TEMP_SET_USER = 'user/TEMP_SET_USER'; // #. 새로고침 이후 임시 로그인 처리

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');

// #. 액션 생성 함수
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}

// #. 초기화
const initialState = {
  user: null,
  checkError: null,
};

// #. 리듀서 함수
const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
  },
  initialState,
);

export default user;
