import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

// #. 액션 타입 정의 : '모델명/액션명' 형태로 하여 액션명 충돌 방지
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

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
