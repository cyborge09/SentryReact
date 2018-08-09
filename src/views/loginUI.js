import React from 'react';
import * as loginService from '../services/loginServices';
import { Redirect } from 'react-router-dom';
import UserActionHeader from '../component/UserActionHeader';
import { Link } from 'react-router-dom';

class LoginUi extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      alert('Empty Field');
    } else {
      var loginState = await loginService.validateAdminStatus(
        this.state.email,
        this.state.password
      );
      if (loginState) {
        this.props.setLoginSuccess(
          loginState.accessToken,
          loginState.refreshToken
        );
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
            <span> LOGIN</span>
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
