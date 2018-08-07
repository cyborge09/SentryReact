import React from 'react';
import { Link } from 'react-router-dom'

class UserActionHeader extends React.Component {
    render() {
        return (
            <div className="user-Header-Head ">
                <div className="user-Header-Wrapper clearfix">
                    {/* name not sure */}

                    <ul>
                        <li><Link to={'/SignUp'}>SignUp</Link></li>
                    </ul>
                    <ul>
                        <li><Link to={'/login'}>Login</Link></li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default UserActionHeader;