import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

// #. 액션 타입 정의 : '모델명/액션명' 형태로 하여 액션명 충돌 방지
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// #. redux-saga 비동기 작업 관리 (액션 타입 일괄 생성 사용자정의 함수 사용)
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');

// #. redux-saga 비동기 작업 관리 (액션 타입 일괄 생성 사용자정의 함수 사용)
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

// #. 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    // #. form:  register / login
    // #. key:   username / password / passwordConfirm
    // #. value: 실제 바꾸려는 값
    form,
    key,
    value,
  }),
);

export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

// #. 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // #. register / login

// #. 초기 상태
const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

// #. 리듀서 함수
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // #. state.register.username
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // #. 폼 전환시 회원 인증 에러 초기화
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;

/**
 * [ 리덕스 ]
 * 리덕스 스토어를 생성하고 Provider 컴포넌트를 통해 프로젝트에 리덕스를 적용
 *
 * [ redux-saga ]
 * 비동기 작업
 *
 * [ immer ]
 * 불변성 관리. spread 연산자 활용하여 불변성 관리하는 것으로 대체 가능.
 *
 * [ 리덕스 모듈 ]
 * Ducks 패턴 : 액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 정의되어 있는 리덕스 모듈.
 */
