import React from 'react';

class SignUpUi extends React.Component {
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

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>SIGNUP</h1>
                    <label>EMAIL : </label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                    />
                    <br/>
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
            </div>
        )
    }
}

export default SignUpUi;