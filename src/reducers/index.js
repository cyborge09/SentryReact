import { combineReducers } from 'redux';

import projectReducer from './projectReducer';
import adminReducer from './adminReducer';
import projectInstanceReducer from './projectInstanceReducer';
import logReducer from './logReducer';

const reducer = combineReducers({
  project: projectReducer,
  login: adminReducer,
  projectInstance: projectInstanceReducer,
  log: logReducer,
});

export default reducer;
