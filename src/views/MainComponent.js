import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './login';
import SignUp from './signUp';
import Dashboard from './dashboard';
import ProjectInstance from './projectInstance';
import log from './log';

class MainComponent extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/projects" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />

            <Route
              exact
              path="/projects/:id/project-instances/:iid/logs"
              component={log}
            />
            <Route
              exact
              path={'/projects/:id/project-instances'}
              component={ProjectInstance}
            />
            <Redirect
              from="/projects/:id"
              to="/projects/:id/project-instances"
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// <Route exact path="/" render={() => <Redirect to="/login" />} />
export default MainComponent;
