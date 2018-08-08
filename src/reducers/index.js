import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import loginlogoutReducer from './loginlogoutReducer';

const reducer = combineReducers({
  admin: adminReducer,
  login: loginlogoutReducer,
});

export default reducer;
