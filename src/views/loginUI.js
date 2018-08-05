import React from "react";
import * as loginService from "../services/loginServices";
import { Redirect } from "react-router-dom";

class LoginUi extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

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
  };

  redirectToSignUp = () => {
    this.props.history.push(`/signup`);
  };

  render() {
    return this.props.islogin ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>LOGIN</h1>
          <label>EMAIL : </label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
          />
          <br />
          <label>PASSWORD : </label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
          />

          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
        <div>
          <p> New here? Click below to sign up </p>
          <button
            type="button"
            onClick={() => {
              this.redirectToSignUp();
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default LoginUi;
