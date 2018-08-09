import React from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import { logout } from '../actions/loginoutActions';
import { Redirect } from 'react-router-dom';

class Header extends React.Component {
  logOut = async () => {
    await store.dispatch(logout());
    await localStorage.clear();
  };

  forceLogOut = () => {
    console.log('here');
    this.logOut();
    return <Redirect to="/login" />;
  };

  render() {
    return localStorage.getItem('RefreshToken') === null ? (
      this.forceLogOut()
    ) : (
      <div className="header-Head">
        <div className="header-Wrapper clearfix">
          {/* name not sure */}
          <ul>
            <li>
              <Link to={'/dashboard'}>DASHBOARD</Link>
            </li>
            <li onClick={this.logOut}>
              <Link to={'/login'}>SIGN OUT</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
