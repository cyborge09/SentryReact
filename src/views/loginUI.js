import React from 'react';
import * as loginService from '../services/loginServices';
import { Redirect } from 'react-router-dom';
import UserActionHeader from '../component/UserActionHeader';
import { Link } from 'react-router-dom';
import validateForm from '../utils/validateForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

    if (validation === 'Valid') {
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
    } else {
      this.setState({ headerMessage: validation });
    }
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
          <form className="form">
            <TextField
              id="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              name="email"
            />
            <span className="error" id="email-error">
              {' '}
            </span>

            <br />
            <TextField
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="password"
              label="Password"
            />
            <span className="error" id="email-pass" />

            <br />
            <br />

            <Button
              variant="contained"
              color="primary"
              className="login-btn"
              type="button"
              value="Log In"
              onClick={this.onSubmit}
            >
              LOG IN
            </Button>
          </form>

          <div className="redirect-SignUp">
            <p>
              {' '}
              New here? Click here to <Link to={'/SignUp'}>Sign Up</Link>{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginUi;
