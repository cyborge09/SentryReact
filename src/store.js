
import LoginoutReducer from './reducers/loginlogoutReducer'
import {createStore} from 'redux'
let store = createStore(LoginoutReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;