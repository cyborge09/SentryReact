import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class UserActionHeader extends React.Component {
	render() {
		return (
			<AppBar id="main" position="static" color="primary">
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
