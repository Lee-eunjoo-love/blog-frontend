import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';

// #. 루트 리듀서
const rootReducer = combineReducers({
  auth,
  loading,
});

export default rootReducer;
