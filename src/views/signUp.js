import React from "react";
import * as https from "../utils/https";
import { Redirect } from "react-router-dom";
import UserActionHeader from "../component/UserActionHeader";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      newAdminSuccess: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    let data = {
      email: this.state.email,
      password: this.state.password
    };

    if (data.email === '' || data.password === '') {
      return alert("Empty Field")
    }
    let response = await https
      .post("signUp", data)
      .then(data => {
        if (data.status === 201) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => console.log(err));
    console.log("response", response)
    if (response) {
      this.setState({
        newAdminSuccess: true
      });
    }
  };

  redirectToLogin = () => {
    this.props.history.push(`/login`);
  };

  adminCreated = () => {
    if (this.state.newAdminSuccess) {
      return <Redirect to="/login" />
    }
  };

  render() {
    return (
      <div>
        <UserActionHeader {...this.props} />
        {this.adminCreated()}
        <div className="signUp-Wrapper">
          <form className="form" >
            <input
              value={this.state.email}
              onChange={this.onChange}
              placeholder="USER-EMAIL"
              type="text"
              name="email"
            />
            <br />
            <input
              value={this.state.password}
              onChange={this.onChange}
              placeholder="USER-PASSWORD"
              type="password"
              name="password"
            />

            <button className="signUp-btn" type="button" onClick={this.onSubmit} >SIGN UP</button>
          </form>
          <div className="redirect-LogIn" >
            <p>  Already Registered? <a href="#" onClick={() => this.redirectToLogin()}>LogIn</a> </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
