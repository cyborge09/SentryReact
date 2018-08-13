import { combineReducers } from 'redux';

import projectReducer from './projectReducer';
import adminReducer from './adminReducer';
import projectInstanceReducer from './projectInstanceReducer';

const reducer = combineReducers({
  project: projectReducer,
  login: adminReducer,
  projectInstance: projectInstanceReducer,
});

export default reducer;
