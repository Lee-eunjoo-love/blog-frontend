import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import rootReducer, { rootSaga } from './modules';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '../node_modules/redux-devtools-extension/index';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from './modules/user';

const sagaMiddelware = createSagaMiddleware();

// #. redux-saga 미들웨어 적용
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddelware)),
);

// #. 로그인 상태 정보 검증
function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check()); // #. store.dispatch(함수())
  } catch (e) {
    console.log('로그인 정보 검증시 예기치 않은 오류 발생', e);
  }
}

sagaMiddelware.run(rootSaga);
loadUser(); // #. saga 미들웨어 호출 후 호출 필요

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
