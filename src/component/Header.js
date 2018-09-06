import React from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { logout } from '../actions/loginoutActions';

import { Redirect } from 'react-router-dom';

const styles = theme => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing.unit * 2,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 100,
	},
});

class Header extends React.Component {
	constructor() {
		super();
		this.state = { open: false };
	}
	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};

	logOut = async () => {
		await store.dispatch(logout());
	};

	forceLogOut = () => {
		this.logOut();
		return <Redirect to="/login" />;
	};

	render() {
		const { classes } = this.props;
		const { open } = this.state;

		return localStorage.getItem('RefreshToken') === null ? (
			this.forceLogOut()
		) : (
			<div>
				<AppBar id="main" position="static">
					<Toolbar id="Main-header-wrapper">
						<img src={require('../img/sentryIcon.png')} alt="sentryIcon" />

						<Typography variant="display3" color="inherit">
							Sentry
						</Typography>
						<div className="header-Wrapper">
							<ul>
								<li>
									<Button
										component={Link}
										to="/projects"
										className={
											this.props.location.pathname === '/projects'
												? 'active'
												: 'inactive'
										}
									>
										Projects
									</Button>
								</li>

								<li>
									<Button
										component={Link}
										to="/projects/all"
										className={
											this.props.match.path ===
											'/projects/:id/project-instances'
												? 'active'
												: 'inactive'
										}
									>
										INSTANCES
									</Button>
								</li>

								<li>
									<Button
										component={Link}
										to="/logs/all/all"
										className={
											this.props.match.path ===
											'/projects/:id/project-instances/:iid/logs'
												? 'active'
												: 'inactive'
										}
									>
										LOGS
									</Button>
								</li>
							</ul>
						</div>

						<div className="account-icon">
							<span>{this.props.userName}</span>

							<IconButton
								id="logout-button"
								// className={classes.menuButton}
								color="inherit"
								aria-label="Menu"
								buttonRef={node => {
									this.anchorEl = node;
								}}
								aria-owns={open ? 'menu-list-grow' : null}
								aria-haspopup="true"
								onClick={this.handleToggle}
							>
								<AccountCircle />
							</IconButton>
							<Popper
								open={open}
								anchorEl={this.anchorEl}
								transition
								disablePortal
							>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										id="menu-list-grow"
										style={{
											transformOrigin:
												placement === 'bottom' ? 'center top' : 'center bottom',
										}}
									>
										<Paper className={classes.paper}>
											<ClickAwayListener onClickAway={this.handleClose}>
												<MenuList>
													<Link to="/login" onClick={this.logOut}>
														<MenuItem onClick={this.handleClose}>
															SIGN OUT
														</MenuItem>
													</Link>
												</MenuList>
											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(Header);
