import React from 'react';
import * as loginService from '../services/loginServices';
import { Redirect } from 'react-router-dom';
import UserActionHeader from '../component/UserActionHeader';
import { Link } from 'react-router-dom';
import validateForm from '../utils/validateForm';

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

    if (this.state.email === '' || this.state.password === '') {
      this.setState({ headerMessage: 'EMPTY FIELD' });
    } else {
      var validation = validateForm(
        this.state.email,
        this.state.password,
        'login'
      );
    }

    if (validation) {
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
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              name="email"
              placeholder="EMAIL"
            />
            <br />
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              placeholder="PASSWORD"
            />

            <button
              className="login-btn"
              type="button"
              value="Log In"
              onClick={this.onSubmit}
            >
              LOG IN
            </button>
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
