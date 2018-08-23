import React from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
      <div>
        <AppBar
          position="static"
          className="header-Head"
          style={{
            background: 'linear-gradient(45deg, #000000 30%, #000000 90%)',
          }}
        >
          <Toolbar className="header-Wrapper clearfix">
            <Typography variant="title" color="inherit">
              DASHBOARD
            </Typography>

            <ul>
              <li>
                <Button component={Link} to="/projects">
                  Projects
                </Button>
              </li>

              <li>
                <Button component={Link} to="/projects/all">
                  INSTANCES
                </Button>
              </li>

              <li>
                <Button component={Link} to="/logs/all/all">
                  LOGS
                </Button>
              </li>

              <li onClick={this.logOut}>
                <Button component={Link} to="/login">
                  SIGN OUT
                </Button>
              </li>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
