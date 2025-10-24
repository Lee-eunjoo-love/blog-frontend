import { createAction, handleActions } from 'redux-actions';

// #. 액션 타입
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// #. 액션 생성 함수
export const sampleAction = createAction(
  START_LOADING,
  (requestType) => requestType,
);

// #. 초기화
const initialState = {};

// #. 리듀서 함수
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => state,
  },
  initialState,
);

export default loading;
