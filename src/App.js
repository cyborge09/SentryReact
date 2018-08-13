import './css/App.css';
import './css/Header.css';
import './css/UserActionHeader.css';
import store from './store';
import MainComponent from './views/MainComponent';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route component={MainComponent} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
