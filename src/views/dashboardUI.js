import React from 'react';
import ReactModal from 'react-modal';
import { sortByKey } from '../utils/extra';

import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Tooltip,
	DialogContentText,
	TablePagination,
} from '@material-ui/core';
import Tile from '../component/ProjectTiles';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import * as projectServices from '../services/projectServices';
// import Table from '../component/ProjectTable';
import Header from '../component/Header';
import orderBy from 'lodash/orderBy';

const invertDirection = {
	asc: 'desc',
	desc: 'asc',
};
class DashboardUI extends React.Component {
	constructor() {
		super();

		this.state = {
			projectName: '',
			userEmail: null,
			showModalAddProject: false,
			showModalDeleteProject: false,
			toDeleteProjectId: '',
			toDeleteProjectName: '',
			confirm: '',
			columnToSort: '',
			sortDirection: 'desc',
			instanceState: false,
			searchQuery: '',
			pagination: [],
			page: 0,
			rowsPerPage: 5,
			description: '',
			showModalUpdateProject: false,
			updateProjectId: '',
			snackOpen: false,
			snackBarText: '',
		};
	}

	handleCloseSnack = () => {
		this.setState({ snackBarText: '', snackOpen: false });
	};

	handleOpenModalAddProject = () => {
		this.setState({ showModalAddProject: true });
	};

	handleCloseModalAddProject = () => {
		this.setState({ showModalAddProject: false });
	};

	handleOpenModalUpdateProject = data => {
		this.setState({
			showModalUpdateProject: true,
			projectName: data.project_name,
			description: data.description,
			updateProjectId: data.id,
		});
	};

	handleCloseModalUpdateProject = () => {
		this.setState({
			showModalUpdateProject: false,
			projectName: '',
			description: '',
		});
	};

	handleOpenModalDeleteProject = async (PID, projectName) => {
		console.log('proje', projectName);
		await this.setState({
			showModalDeleteProject: true,
			toDeleteProjectId: PID,
			toDeleteProjectName: projectName,
		});
	};

	handleCloseModalDeleteProject = () => {
		this.setState({
			showModalDeleteProject: false,
			toDeleteProjectId: '',
		});
	};

	componentDidMount() {
		ReactModal.setAppElement('body');
		this.setState({
			userEmail: this.props.userEmail,
		});
		this.getProject(this.props.userEmail);
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = async () => {
		//make an api call
		if (this.state.projectName === '') {
			this.setState({
				snackOpen: true,
				snackBarText: 'Empty Project Name',
			});
			return false;
		} else if (this.state.projectName.length >= 14) {
			this.setState({
				snackOpen: true,
				snackBarText: 'String length exceed the limit(limit=14)',
			});
			return false;
		}
		this.handleCloseModalAddProject();
		this.setState({ open: true });
		setTimeout(() => {
			this.setState({ open: false });
		}, 5000);
		const respond = await projectServices.createNewProject(
			this.state.projectName,
			this.state.description,
			this.state.userEmail
		);
		if (respond.status === 201) {
			this.setState({
				snackOpen: true,
				snackBarText: 'PROJECT ADDED',
			});
			this.setState({ projectName: '', description: '' });
			this.props.projectCreateSuccess();
			this.getProject(this.state.userEmail);
			return true;
		}

		return false;
	};

	addNewProject = () => {
		return (
			<div>
				<Tooltip title="Add Project">
					<Button
						id="add-button"
						variant="fab"
						onClick={this.handleOpenModalAddProject}
						color="primary"
						aria-label="Add"
					>
						<AddIcon />
					</Button>
				</Tooltip>
			</div>
		);
	};
	//sorting function
	handleSort = columnName => {
		this.setState({
			columnToSort: columnName,
			sortDirection:
				this.state.columnToSort === columnName
					? invertDirection[this.state.sortDirection]
					: 'asc',
		});
	};

	//searching from searchbox data

	handleSearchQuery = async e => {
		await this.setState({ searchQuery: e.target.value });

		setTimeout(() => {
			this.getProject(this.props.userEmail, this.state.searchQuery);
		}, 500);

		//fetch the query data
	};

	//handle pagination
	handleChangePage = async (event, page) => {
		await this.setState({ page });
		this.getProject(this.props.userEmail, this.state.searchQuery);
	};

	handleChangeRowsPerPage = async event => {
		await this.setState({ rowsPerPage: event.target.value });
		this.getProject(this.props.userEmail, this.state.searchQuery);
	};

	getProject = async (email, query = '') => {
		let respond = await projectServices
			.fetchRelatedProjects(
				email,
				query,
				this.state.rowsPerPage,
				this.state.page
			)
			.then(res => {
				return res.data;
			});

		this.setState({
			list: respond.data,
			pagination: respond.pagination,
		});

		if (this.state.list !== []) {
			//callback function for project data fetch success
			this.props.onDataFetched(this.state.list);
		}
	};

	displayProject = list => {
		if (list) {
			list = sortByKey(list, 'id');
		}

		// console.log('adasd', list);
		if (list.length === 0 && !this.state.searchQuery) {
			return (
				<div>
					Seems like you have no project yet! lets get started by adding project
				</div>
			);
		}

		return (
			<div>
				<input
					className="search-field"
					type="text"
					placeholder="Search Project Name"
					value={this.state.searchQuery}
					onChange={e => {
						this.handleSearchQuery(e);
					}}
				/>

				{/*
			<Table
					data={orderBy(
						list,
						this.state.columnToSort,
						this.state.sortDirection
					)}
					handleClick={this.handleClick}
					handleDeleteClick={this.handleOpenModalDeleteProject}
					handleUpdateClick={this.handleOpenModalUpdateProject}
					handleSort={this.handleSort}
					sortDirection={this.state.sortDirection}
					columnToSort={this.state.columnToSort}
				/>*/}
				<div className="tile-wrapper">
					<Tile
						data={orderBy(
							list,
							this.state.columnToSort,
							this.state.sortDirection
						)}
						handleClick={this.handleClick}
						handleDeleteClick={this.handleOpenModalDeleteProject}
						handleUpdateClick={this.handleOpenModalUpdateProject}
						handleSort={this.handleSort}
						sortDirection={this.state.sortDirection}
						columnToSort={this.state.columnToSort}
					/>
				</div>

				<TablePagination
					component="div"
					count={this.state.pagination.rowCount}
					rowsPerPage={this.state.pagination.pageSize}
					page={this.state.page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</div>
		);
	};
	handleUpdateClick = async () => {
		console.log('length', this.state.projectName.length);
		//api call for update
		if (this.state.projectName === '') {
			return false;
		} else if (this.state.projectName.length >= 14) {
			this.setState({
				snackOpen: true,
				snackBarText: 'String length exceed the limit(limit=14)',
			});
			return false;
		}
		this.props.projectUpdateBegin();

		const respond = await projectServices.updateProject(
			this.state.projectName,
			this.state.description,
			this.state.userEmail,
			this.state.updateProjectId
		);

		if (respond.status === 200) {
			this.props.projectUpdateSuccess();
			this.setState({ projectName: '', description: '' });
			this.getProject(this.state.userEmail);
			this.handleCloseModalUpdateProject();
			this.setState({
				snackOpen: true,
				snackBarText: 'UPDATE SUCCESSFULL',
			});

			return true;
		} else {
			this.props.projectUpdateError();
		}

		return false;
	};

	handleClick = ({ id, name }) => {
		this.props.history.push({
			pathname: '/projects/' + id + '/project-instances/',
		});
	};

	handleDeleteClick = async PID => {
		//api call for delete
		const respond = await projectServices.deleteSpecificProject(PID);

		if (respond.status === 204) {
			await this.setState({
				snackOpen: true,
				snackBarText: 'Project ' + this.state.toDeleteProjectName + ' Deleted',
				toDeleteProjectName: '',
			});
			this.getProject(this.state.userEmail);
			this.props.onDataDelete();
		}
	};

	render() {
		return (
			<div className="fix">
				<Header {...this.props} userName={this.state.userEmail} />
				{/*UPDATE */}
				<Dialog
					open={this.state.showModalUpdateProject}
					onClose={this.handleCloseModalUpdateProject}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">UPDATE PROJECT</DialogTitle>

					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Name Of Project"
							fullWidth
							value={this.state.projectName}
							onChange={this.onChange}
							type="text"
							name="projectName"
						/>
						<TextField
							margin="dense"
							label="Description"
							fullWidth
							value={this.state.description}
							onChange={this.onChange}
							type="text"
							name="description"
						/>
					</DialogContent>
					<form>
						<DialogActions>
							<Button
								onClick={this.handleCloseModalUpdateProject}
								color="primary"
							>
								Cancel
							</Button>
							<Button onClick={e => this.handleUpdateClick()} color="primary">
								UPDATE
							</Button>
						</DialogActions>
					</form>
				</Dialog>

				<Dialog
					open={this.state.showModalAddProject}
					onClose={this.handleCloseModalAddProject}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">ADD NEW PROJECT</DialogTitle>

					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Name Of Project"
							fullWidth
							value={this.state.projectName}
							onChange={this.onChange}
							type="text"
							name="projectName"
						/>
						<TextField
							margin="dense"
							label="Description"
							fullWidth
							value={this.state.description}
							onChange={this.onChange}
							type="text"
							name="description"
						/>
					</DialogContent>
					<form>
						<DialogActions>
							<Button onClick={this.handleCloseModalAddProject} color="primary">
								Cancel
							</Button>
							<Button
								onClick={e =>
									this.onSubmit()
										? console.log('this is true')
										: console.log('this is false')
								}
								color="primary"
							>
								ADD
							</Button>
						</DialogActions>
					</form>
				</Dialog>

				{/* delete project dialog  */}
				<Dialog
					open={this.state.showModalDeleteProject}
					onClose={this.handleCloseModalDeleteProject}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">DELETE PROJECT</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure to Delete this Project?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={this.handleCloseModalDeleteProject}
							color="primary"
						>
							Cancel
						</Button>
						<Button
							onClick={e => {
								this.handleDeleteClick(this.state.toDeleteProjectId);
								this.handleCloseModalDeleteProject();
							}}
							color="primary"
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>

				<div className="dashboard-wrapper">
					<div className="project-name-add clearfix">
						<p>
							<img src={require('../img/project.png')} alt="Project" />{' '}
							<span> PROJECTS</span>
						</p>

						<span> {this.addNewProject()}</span>
					</div>

					<div>{this.displayProject(this.props.data)}</div>
				</div>
				<div>
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						open={this.state.snackOpen}
						onClose={this.handleCloseSnack}
						ContentProps={{
							'aria-describedby': 'message-id',
						}}
						message={<span>{this.state.snackBarText}</span>}
						autoHideDuration={1000}
					/>
				</div>
			</div>
		);
	}
}

export default DashboardUI;
