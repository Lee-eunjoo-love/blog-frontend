import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// #. 액션 타입
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createRequestActionTypes('posts/READ_POST');
const UNLOAD_POST = 'posts/UNLOAD_POST'; // #. 포스트 페이지에서 벗어날 때 리덕스 상태 데이터 초기화

// #. 액션 생성 함수
export const readPost = createAction(READ_POST, (id) => id);
export const unloadPost = createAction(UNLOAD_POST);

// #. saga
const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

// #. 초기화
const initialState = {
  post: null,
  error: null,
};

// #. 리듀서 함수
const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;

/**
 * 페이지를 벗어날 때 리덕스 상태 데이터를 초기화하지 않으면,
 * 뒤로 가기로 돌아가 또다른 포스트를 읽을 때
 * 아주 짧은 시간 동안 이전에 불어왔던 포스트가 나타나는 깜박임 현상 발생.
 */
