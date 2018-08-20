import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class UserActionHeader extends React.Component {
  render() {
    return (
      <AppBar position="static" color="blue">
        <Toolbar className="header-title">
          <Typography variant="title" color="inherit">
            Sentry Project Manager
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default UserActionHeader;
