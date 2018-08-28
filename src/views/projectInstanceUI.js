import React, { Component } from 'react';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  TablePagination,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as projectInstanceServices from '../services/projectInstanceServices';
import * as projectServices from '../services/projectServices';
import Header from '../component/Header';
import ProjectInstanceTable from '../component/ProjectInstanceTable';
import ReactModal from 'react-modal';

export default class ProjectInstance extends Component {
  constructor() {
    super();
    this.state = {
      showModalAddProject: false,
      showModalDeleteProject: false,
      instanceName: '',
      activeProject: '',
      fetchedProjectInstances: [],
      showModalChangeProject: false,
      allProjects: [],
      projectId: '--',
      showModalDeleteInstance: false,
      toDeleteInstanceId: '',
      toDeleteInstanceName: '',
      confirm: '',
      searchQuery: '',
      pagination: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleOpenModalAddProject = () => {
    this.setState({ showModalAddProject: true });
  };

  handleCloseModalAddProject = () => {
    this.setState({ showModalAddProject: false });
  };

  handleOpenModalChangeProject = () => {
    this.setState({ showModalChangeProject: true });
  };
  handleCloseModalChangeProject = () => {
    this.setState({
      showModalChangeProject: false,
      allProjects: [],
    });
  };

  handleOpenModalDeleteInstance = (IID, instanceName) => {
    this.setState({
      showModalDeleteInstance: true,
      toDeleteInstanceId: IID,
      toDeleteInstanceName: instanceName,
    });
  };

  handleCloseModalDeleteInstance = () => {
    this.setState({
      showModalDeleteInstance: false,
      toDeleteInstanceId: '',
      toDeleteInstanceName: '',
    });
  };

  //to fetch and display project instances//
  async componentDidMount() {
    ReactModal.setAppElement('body');
    var projectName = await this.getProjectName(
      this.props.match.params.id,
      this.props.userId
    );

    this.setState({
      activeProject: projectName,
      projectId: this.props.match.params.id,
    });

    this.props.setCurrentProject(projectName);
    this.getProjectInstances(this.props.match.params.id, this.props.userId);
  }
  //handle pagination
  handleChangePage = async (event, page) => {
    await this.setState({ page });

    this.getProjectInstances(this.props.match.params.id, this.props.userId);
  };

  handleChangeRowsPerPage = async event => {
    await this.setState({ rowsPerPage: event.target.value });
    this.getProjectInstances(this.props.match.params.id, this.props.userId);
  };

  //searching from searchbox data
  handleSearchQuery = async e => {
    await this.setState({ searchQuery: e.target.value });
    setTimeout(() => {
      //fetch the query data
      this.getProjectInstances(this.props.match.params.id, this.props.userId);
    }, 500);
  };

  getProjectName = async (projectID, userId) => {
    if (projectID === 'all') {
      return 'All Projects Instances';
    }
    const respond = await projectServices.getRelatedProjectName(
      projectID,
      userId
    );

    if (respond.data.data.length !== 0) {
      return respond.data.data[0].project_name;
    } else {
      return '';
    }
  };

  handleDeleteClick = async (IID, instanceName) => {
    //api call for delete
    const respond = await projectInstanceServices.deleteSpecificProjectInstances(
      IID
    );

    if (respond.status === 204) {
      this.getProjectInstances(this.props.match.params.id, this.props.userId);
      this.props.projectInstanceDeleteSuccess();
    }
  };

  getAllProjects = async () => {
    const respond = await projectServices.getRelatedProjectName(
      'all',
      this.props.userId
    );
    this.setState({ allProjects: respond.data.data });
  };

  getProjectInstances = async (projectID, userId) => {
    this.props.projectInstanceFetchBegin();
    try {
      var respond = await projectInstanceServices.getRelatedProjectInstances(
        projectID,
        userId,
        undefined,
        this.state.searchQuery,
        this.state.rowsPerPage,
        this.state.page
      );
      if (respond.status === 200) {
        this.setState({
          fetchedProjectInstances: respond.data.data,
          pagination: respond.data.pagination,
        });
        this.props.projectInstanceFetchSuccess(respond.data.data);
      } else {
        throw respond.err;
      }
    } catch (err) {
      this.props.projectInstanceFetchError(respond.status);
    }
  };

  displayProjectInstances = projectInstances => {
    if (projectInstances.length === 0 && !this.state.searchQuery) {
      return <div>No Project-Instances yet!</div>;
    }
    return (
      <div>
        <input
          type="text"
          className="search-field"
          placeholder="Search Instance Name"
          value={this.state.searchQuery}
          onChange={e => {
            this.handleSearchQuery(e);
          }}
        />

        <ProjectInstanceTable
          data={projectInstances}
          copyInstanceKey={this.copyInstanceKey}
          handleClick={this.handleClick}
          // handleDeleteClick={this.handleDeleteClick}
          handleDeleteClick={this.handleOpenModalDeleteInstance}
        />
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
  //----------------------------------------------------------//
  handleClick = (existingUrl, instanceId, instanceName, projectId) => {
    this.props.history.push({
      pathname:
        '/projects/' +
        projectId +
        '/project-instances/' +
        instanceId +
        '/logs/',
    });
  };

  showAllLogs = () => {
    return (
      <button
        className="search-btn"
        type="button"
        value="All Logs"
        onClick={this.handleClick}
      >
        All Logs
      </button>
    );
  };

  addNewProjectInstance = () => {
    if (this.props.match.params.id === 'all') {
      return false;
    } else {
      return (
        <Tooltip title="Add Instances">
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
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    if (this.state.instanceName === '') {
      return alert('Empty Field');
    }
    //here write api call to create a new instance
    const respond = await projectInstanceServices.createNewProjectInstance(
      this.state.instanceName,
      this.props.match.params.id
    );
    if (respond.status === 201) {
      this.props.projectInstanceCreateSuccess();
      this.getProjectInstances(this.props.match.params.id, this.props.userId);
    }
    // this.setState({
    //   instanceKey: respond.instance_key,
    // });
  };

  render() {
    return (
      <div>
        {/*header Component*/}
        <Header {...this.props} userName={this.props.userEmail} />

        <Dialog
          open={this.state.showModalAddProject}
          onClose={this.handleCloseModalAddProject}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ADD Instances</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Project Instance"
              fullWidth
              value={this.state.projectName}
              onChange={this.onChange}
              type="text"
              name="instanceName"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModalAddProject} color="primary">
              Cancel
            </Button>
            <Button
              onClick={e => {
                this.handleCloseModalAddProject();
                this.onSubmit();
              }}
              color="primary"
            >
              ADD
            </Button>
          </DialogActions>
        </Dialog>

        {/*Add Project Instances modal*/}

        {/*Change project modal*/}

        <Dialog
          open={this.state.showModalChangeProject}
          aria-labelledby="form-dialog-title"
          onClose={this.handleCloseModalChangeProject}
        >
          <DialogTitle id="form-dialog-title">CHANGE PROJECT</DialogTitle>
          <form className="react-Modal">
            <select
              className="change-project-select"
              name="projectId"
              onChange={e => {
                this.onChange(e);
              }}
            >
              <option key={'--'} value={'--'}>
                SELECT PROJECTS
              </option>
              <option key={'all'} value={'all'}>
                All
              </option>
              {this.state.allProjects.map(
                (data, id) =>
                  parseInt(this.props.match.params.id, 10) ===
                  data.project_id ? (
                    <option
                      key={id}
                      value={data.project_id}
                      // defaultChecked={data.project_name}
                      selected="selected"
                    >
                      {data.project_name}
                    </option>
                  ) : (
                    <option key={id} value={data.project_id}>
                      {data.project_name}
                    </option>
                  )
              )}
            </select>
            <DialogActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  if (
                    this.state.projectId !==
                    (this.props.match.params.id || '--')
                  ) {
                    this.props.history.push({
                      pathname: '/projects/' + this.state.projectId,
                    });
                  }
                  this.handleCloseModalChangeProject();
                }}
              >
                OK
              </Button>
            </DialogActions>
            <div />
          </form>
        </Dialog>

        {/*Delete instance modal*/}
        <ReactModal
          isOpen={this.state.showModalDeleteInstance}
          onRequestClose={this.handleCloseModalDeleteInstance}
          className="modal-AddProject"
        >
          <form
            className="react-Modal"
            onSubmit={() => {
              if (this.state.confirm === 'CONFIRM') {
                this.handleCloseModalDeleteInstance();
                this.handleDeleteClick(
                  this.state.toDeleteProjectId,
                  this.state.toDeleteProjectName
                );
              } else {
                this.setState({ confirm: '' });
                this.handleCloseModalDeleteInstance();
              }
            }}
          >
            <div className="add-project-modal-header">
              DELETE INSTANCE
              <span onClick={this.handleCloseModalDeleteInstance}> X</span>
            </div>

            <div className="add-project-form-wrapper">
              <div className="delete-Info">
                <img src={require('../img/deleteProjects.png')} alt="delete" />
                <span>INSTANCE NAME: {this.state.toDeleteInstanceName}</span>
              </div>
              <span>
                <input
                  name="confirm"
                  value={this.state.confirm}
                  placeholder="TYPE CONFIRM"
                  onChange={this.onChange}
                />
              </span>

              <button
                onClick={async () => {
                  if (this.state.confirm === 'CONFIRM') {
                    this.setState({ confirm: '' });
                    this.handleCloseModalDeleteInstance();
                    await this.handleDeleteClick(
                      this.state.toDeleteInstanceId,
                      this.state.toDeleteInstanceName
                    );
                  } else {
                    this.setState({ confirm: '' });
                    this.handleCloseModalDeleteInstance();
                  }
                }}
              >
                CONFIRM
              </button>
            </div>
          </form>
        </ReactModal>

        <div className="dashboard-wrapper">
          <div className="project-name-add clearfix">
            <p>
              <img src={require('../img/instances.png')} alt="Project" />
              <span
                className="change-project"
                onClick={() => {
                  this.handleOpenModalChangeProject();
                  this.getAllProjects();
                }}
              >
                {this.state.activeProject}
                <img src={require('../img/dropdown.png')} alt="dropdown" />
              </span>
            </p>

            <span> {this.addNewProjectInstance()}</span>
          </div>

          {/*display projeect Instances*/}

          <div> {this.displayProjectInstances(this.props.projectInstance)}</div>
        </div>
      </div>
    );
  }
}
