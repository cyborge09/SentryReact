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
    this.logOut();
    return <Redirect to="/login" />;
  };

  render() {
    return localStorage.getItem('RefreshToken') === null ? (
      this.forceLogOut()
    ) : (
      <div className="header-Head">
        <div className="header-Wrapper clearfix">
          <ul>
            <li>
              <Link to={'/projects'}>PROJECTS</Link>
            </li>
            <li>
              <Link to={'/projects/all'}>INSTANCES</Link>
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
