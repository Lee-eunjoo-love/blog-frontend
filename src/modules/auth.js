import { createAction, handleActions } from 'redux-actions';

// #. 액션 타입 정의 : '모델명/액션명' 형태로 하여 액션명 충돌 방지
const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

// #. 액션 생성 함수
export const sampleAction = createAction(SAMPLE_ACTION);

// #. 초기 상태
const initialState = {};

// #. 리듀서 함수
const auth = handleActions(
  {
    [SAMPLE_ACTION]: (state, action) => state,
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
