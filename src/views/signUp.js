import React from "react";
import * as https from "../utils/https";

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
      return <h1>New Admin Created</h1>;
    }
  };

  render() {
    return (
      <div>
        {this.adminCreated()}
        <form onSubmit={this.onSubmit}>
          <h1>SIGNUP</h1>
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
            <input type="submit" value="SIGNUP" />
          </div>
        </form>
        <div>
          <p> Click below to go back to login</p>
          <button
            type="button"
            onClick={() => {
              this.redirectToLogin();
            }}
          >
            LOG IN
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
