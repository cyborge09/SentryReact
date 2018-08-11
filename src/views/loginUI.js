import React from 'react';
import * as loginService from '../services/loginServices';
import { Redirect } from 'react-router-dom';
import UserActionHeader from '../component/UserActionHeader';
import { Link } from 'react-router-dom';
import validateForm from '../utils/validateForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class LoginUi extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      headerMessage: 'LOGIN',
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const validation = validateForm(
      this.state.email,
      this.state.password,
      'login'
    );

    if (validation === true) {
      this.props.setLoginBegin();
      var loginState = await loginService.validateAdminStatus(
        this.state.email,
        this.state.password
      );

      if (loginState.loginStatus) {
        this.props.setLoginSuccess(
          loginState.accessToken,
          loginState.refreshToken,
          this.state.email
        );
      } else {
        this.props.setLoginError();
        this.setState({ headerMessage: loginState.data.error.message });
      }
    }

    return validation;
  };

  redirectToSignUp = () => {
    this.props.history.push(`/signup`);
  };

  render() {
    return this.props.isLogin ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <UserActionHeader {...this.props} />

        <div className="login-wrapper">
          <div className="login-form-header">
            {this.props.loggingIn ? (
              <span>PLEASE WAIT</span>
            ) : (
              <span>{this.state.headerMessage}</span>
            )}
          </div>

          <ValidatorForm ref="form" className="form" onSubmit={this.onSubmit}>
            <TextValidator
              id="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              name="email"
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />

            <br />
            <TextValidator
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="password"
              label="Password"
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <br />
            <br />

            <Button
              variant="contained"
              color="primary"
              className="login-btn"
              type="submit"
              value="Log In"
            >
              LOG IN
            </Button>
          </ValidatorForm>

          <div className="redirect-SignUp">
            <p>
              New here? Click here to <Link to={'/SignUp'}>Sign Up</Link>{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginUi;
