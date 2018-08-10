import { combineReducers } from 'redux';

import projectReducer from './projectReducer';
import adminReducer from './adminReducer';

const reducer = combineReducers({
  project: projectReducer,
  login: adminReducer,
});

export default reducer;
