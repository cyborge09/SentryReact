import React from 'react';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import * as projectServices from '../services/projectServices';
import Table from '../component/ProjectTable';
import Header from '../component/Header';

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
    };
  }

  handleOpenModalAddProject = () => {
    this.setState({ showModalAddProject: true });
  };

  handleCloseModalAddProject = () => {
    this.setState({ showModalAddProject: false });
  };

  handleOpenModalDeleteProject = (PID, projectName) => {
    this.setState({
      showModalDeleteProject: true,
      toDeleteProjectId: PID,
      toDeleteProjectName: projectName,
    });
  };

  handleCloseModalDeleteProject = () => {
    this.setState({
      showModalDeleteProject: false,
      toDeleteProjectId: '',
      toDeleteProjectName: '',
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

  displayUserName = () => {
    return (
      <div className="header">
        <div className="header-dashboard-wrapper clearfix">
          <div className="title">PROJECT DASHBOARD</div>
          <div className="user">
            <strong> WELCOME {this.state.userEmail} </strong>
          </div>
        </div>
      </div>
    );
  };

  onSubmit = async () => {
    //make an api call
    if (this.state.projectName === '') {
      return false;
    }
    const respond = await projectServices.createNewProject(
      this.state.projectName,
      this.state.userEmail
    );
    if (respond.status === 201) {
      this.setState({ projectName: '' });
      this.getProject(this.state.userEmail);
      this.handleCloseModalAddProject();
      return true;
    }

    return false;
  };

  addNewProject = () => {
    return (
      <Tooltip title="Add Project">
        <Button
          variant="fab"
          onClick={this.handleOpenModalAddProject}
          color="primary"
          aria-label="Add"
        >
          <AddIcon />
        </Button>
      </Tooltip>
    );
  };

  getProject = async email => {
    let respond = await projectServices
      .fetchRelatedProjects(email)
      .then(res => res.data.data);
    this.setState({
      list: respond,
    });
    if (this.state.list !== []) {
      //callback function for project data fetch success
      this.props.onDataFetched(this.state.list);
    }
  };

  displayProject = list => {
    if (list.length === 0) {
      return (
        <div>
          Seems like you have no project yet! lets get started by adding project
        </div>
      );
    }
    return (
      <Table
        data={list}
        handleClick={this.handleClick}
        handleDeleteClick={this.handleOpenModalDeleteProject}
      />
    );
  };

  handleClick = ({ id, name }) => {
    this.props.history.push({
      pathname: '/projects/' + id + '/project-instances/',
    });
  };

  handleDeleteClick = async PID => {
    console.log('i am inside handle delete click');
    //api call for delete
    const respond = await projectServices.deleteSpecificProject(PID);
    if (respond.status === 204) {
      this.getProject(this.state.userEmail);
      this.props.onDataDelete();
    }
  };

  render() {
    return (
      <div>
        <Header />
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModalAddProject} color="primary">
              Cancel
            </Button>
            <Button onClick={e => this.onSubmit()} color="primary">
              ADD
            </Button>
          </DialogActions>
        </Dialog>

        {/* delete project dialog  */}
        <Dialog
          open={this.state.showModalDeleteProject}
          onClose={this.handleCloseModalDeleteProject}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">DELETE PROJECT</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure to Delete this Project?</DialogContentText>
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

        {this.displayUserName()}
        <div className="dashboard-wrapper">
          <div className="project-name-add clearfix">
            <p>
              <img src={require('../img/project.png')} alt="Project" />{' '}
              <span> PROJECTS</span>
            </p>
            <span> {this.addNewProject()}</span>
          </div>

          {/*display projeect Instances*/}
          <div>{this.displayProject(this.props.data)}</div>
        </div>
      </div>
    );
  }
}

export default DashboardUI;
