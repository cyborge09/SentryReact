import React from 'react';
import * as https from '../utils/https';
import { Redirect } from 'react-router-dom';
import UserActionHeader from '../component/UserActionHeader';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      newAdminSuccess: false,
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    let response = await https
      .post('signUp', data)
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
        newAdminSuccess: true,
      });
    }
  };

  adminCreated = () => {
    if (this.state.newAdminSuccess) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <div>
        <UserActionHeader />
        {this.adminCreated()}
        <div className="signUp-Wrapper">
          <div className="signUp-form-header">
            <span> SIGN UP</span>
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
              SIGN UP
            </Button>
          </ValidatorForm>

          <div className="redirect-LogIn">
            <p>
              {' '}
              Already Registered? <Link to={'/login'}>LogIn</Link>{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
