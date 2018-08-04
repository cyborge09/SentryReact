import React from 'react';

class LoginUi extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    renderRedirect = () => {
        this.props.history.push(`/signup`)
    }

    render() {
        return (
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
                        <input type="submit" value="Submit" />
                        <button type="button" onClick={() => {
                            console.log("asdasd");
                            this.renderRedirect();
                        }

                        }>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginUi;