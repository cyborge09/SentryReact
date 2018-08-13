import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './login';
import SignUp from './signUp';
import Dashboard from './dashboard';
import ProjectInstance from './projectInstance';
import Log from './log';

class MainComponent extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
            <Route path={'/projectInstance'} component={ProjectInstance} />
            <Route path="/log" component={Log} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// <Route exact path="/" render={() => <Redirect to="/login" />} />
export default MainComponent;
