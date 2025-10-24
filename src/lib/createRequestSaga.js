import { call, put } from 'rdux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    // #. 로딩 시작
    yield put(startLoading(type));

    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    // #. 로딩 끝
    yield put(finishLoading(type));
  };
}

// #. 사용법: createRequestSaga('auth/LOGIN', api.login);
// #. 사용법: createRequestSaga('auth/REIGSTER', api.register);
