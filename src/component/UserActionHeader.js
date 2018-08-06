import React from 'react';
import { Redirect } from "react-router-dom";

class UserActionHeader extends React.Component {

    redirect = (redirectLocation) => {
        console.log("asdsaddasad", this.props);
        switch (redirectLocation) {
            case "SignUp":
                {
                    this.props.history.push(`/signUp`)
                    
                    // // this.context.router.history.push(`/signUp`)
                    // return <Redirect to="/signUp" />
                }

            case "Login":
                {
                    this.props.history.push(`/login`)
                }
        }
    }

    render() {
        return (
            <div className="user-Header-Head ">
                <div className="user-Header-Wrapper clearfix">
                    {/* name not sure */}

                    <ul>
                        <li><a href="#" onClick={() => this.redirect("SignUp")}>SignUp</a></li>
                    </ul>
                    <ul>
                        <li><a href="#" onClick={() => this.redirect("Login")}>Login</a></li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default UserActionHeader;