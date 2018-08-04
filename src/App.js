import React, { Component } from 'react';
// import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Login from './views/login';
import SignUp from './views/signup';
import { Redirect } from 'react-router-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/login" />
            )} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            {/* <Route exact path="/main" component={Main} /> */}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
