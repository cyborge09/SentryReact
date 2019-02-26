import React from 'react';
import * as loginService from '../services/loginServices';
import { Redirect } from 'react-router-dom';
import UserActionHeader from '../component/UserActionHeader';
import Loader from '../component/Loader';
import { Link } from 'react-router-dom';
import validateForm from '../utils/validateForm';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Typography, Button } from '@material-ui/core';

class LoginUi extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			headerMessage: '',
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
					this.state.email,
					loginState.userId
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
			<Redirect to="/projects" />
		) : (
			<div>
				<UserActionHeader />

				<div className="login-wrapper">
					<div>
						<Typography variant="headline" align="center">
							{this.props.loggingIn ? <Loader /> : <span>Login</span>}
						</Typography>
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
						<div className="error">
							{this.props.loggingIn ? (
								''
							) : (
								<span>{this.state.headerMessage}</span>
							)}
						</div>

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
