import React, { Component } from 'react';

import { TextField } from '@material-ui/core/TextField';

import * as logServices from '../services/logServices';
import * as projectServices from '../services/projectServices';
import * as projectInstanceServices from '../services/projectInstanceServices';
import Header from '../component/Header';
import LogTable from '../component/logTable';
import ReactModal from 'react-modal';
import orderBy from 'lodash/orderBy';
import TablePagination from '@material-ui/core/TablePagination';



import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
const invertDirection = {
  asc: 'desc',
  desc: 'asc',
};

export default class Log extends Component {
  constructor() {
    super();
    this.state = {
      fetchedLogs: [],
      showModalChangeLog: false,
      showModalLogDetails: false,
      allProjects: [],
      projectId: '--',
      logId: '--',
      fetchedAllProjectInstances: [],
      activeProject: '',
      activeInstance: '',
      status: '',
      columnToSort: '',
      sortDirection: 'desc',
      checkedState: false,
      searchQuery: '',
      pagination: [],
      page: 0,
      rowsPerPage: 5,

      logMessage: '',
      logName: '',
      logStack: '',
      logInstanceName: '',
      customMessage: '',
      updated_at: '',
    };
  }

  transition = props => {
    return <Slide direction="up" {...props} />;
  };

  handleOpenModalLogDetails = () => {
    this.setState({ showModalLogDetails: true });
  };

  handleCloseModalLogDetails = () => {
    this.setState({
      showModalLogDetails: false,
      logMessage: '',
      logName: '',
      logStack: '',
      logInstanceName: '',
      customMessage: '',
      updated_at: '',
    });
  };

  handleOpenModalChangeLog = () => {
    this.setState({ showModalChangeLog: true });
  };

  handleCloseModalChangeLog = () => {
    this.setState({
      showModalChangeLog: false,
      projectId: this.props.match.params.id,
      logId: this.props.match.params.iid,
    });
  };

  componentDidMount = () => {
    ReactModal.setAppElement('body');
    this.setState({
      projectId: this.props.match.params.id,
      logId: this.props.match.params.iid,
    });
    this.getProjectName();
    this.getInstanceName();
    this.getRelatedLogs(
      this.props.match.params.iid,
      this.props.match.params.id
    );
  };

  getProjectName = async () => {
    let projectID = this.props.match.params.id;

    if (projectID === 'all') {
      return this.setState({ activeProject: 'All Project' });
    }
    const respond = await projectServices.getRelatedProjectName(
      projectID,
      this.props.userId
    );

    if (respond.data.data.length !== 0) {
      this.setState({ activeProject: respond.data.data[0].project_name });
    } else {
      this.setState({ activeProject: '' });
    }
  };
  getInstanceName = async () => {
    let logId = this.props.match.params.iid;
    if (logId === 'all') {
      return this.setState({ activeInstance: 'All Instances' });
    }

    const respond = await projectInstanceServices.getRelatedProjectInstances(
      this.props.match.params.id,
      this.props.userId,
      logId
    );
    if (respond.data.data.length !== 0) {
      this.setState({ activeInstance: respond.data.data[0].instance_name });
    } else {
      this.setState({ activeInstance: '' });
    }
  };

  getAllProjects = async () => {
    const respond = await projectServices.getRelatedProjectName(
      'all',
      this.props.userId
    );
    this.setState({ allProjects: respond.data.data });
  };

  getAllProjectInstances = async projectID => {
    if (projectID === '--' || projectID === 'all') {
      this.setState({ fetchedAllProjectInstances: [] });
    } else {
      var userId = this.props.userId;
      try {
        var respond = await projectInstanceServices.getRelatedProjectInstances(
          projectID,
          userId
        );
        if (respond.status === 200) {
          this.setState({ fetchedAllProjectInstances: respond.data.data });
        } else {
          throw respond.err;
        }
      } catch (err) {
        console.log('No Instance Found');
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getRelatedLogs = async (instanceId, projectId) => {
    this.props.logFetchBegin();
    const respond = await logServices.fetchRelatedLogs(
      instanceId,
      projectId,
      this.props.userId,
      this.state.searchQuery,
      this.state.rowsPerPage,
      this.state.page
    );

    console.log('response +++++++', respond);
    if (respond.status === 200) {
      this.props.logFetchSuccess(respond.data.data);
      this.setState({
        fetchedLogs: respond.data.data,
        pagination: respond.data.pagination,
      });
    } else {
      this.props.logFetchError(respond.status);
    }
  };

  displayProject = () => {
    var logList = this.state.fetchedLogs;

    console.log(logList);

    if (logList.length === 0) {
      return <div>NO LOGS!!!!</div>;
    }
    return (
      <LogTable
        data={orderBy(
          logList,
          this.state.columnToSort,
          this.state.sortDirection
        )}
        handleChangeStatus={this.handleChangeStatus}
        handleSort={this.handleSort}
        sortDirection={this.state.sortDirection}
        columnToSort={this.state.columnToSort}
        checkedState={this.state.checkedState}
        // handleDeleteClick={this.handleOpenModalDeleteProject}
        handleClick={this.handleClick}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
  };

  handleClick = async (data, date) => {
    console.log('data', data);
    await this.setState({
      logMessage: data.errorDetails.message,
      logName: data.errorDetails.name,
      logStack: data.errorDetails.stack,
      customMessage: data.message,
      logInstanceName: data.instance_name,
      updated_at: date,
    });

    this.handleOpenModalLogDetails();
  };

  handleDeleteClick = async logId => {
    const respond = await logServices.deleteLog(logId);
    console.log('res', respond);
    if (respond.status === 204) {
      this.props.logDeleteSuccess();
      this.getRelatedLogs(
        this.props.match.params.iid,
        this.props.match.params.id
      );
    }
  };

  handleChangeStatus = async logId => {
    const respond = await logServices.changeStatus(logId);
    if (respond.status === 200) {
      //dispatch action
      console.log('res', respond);
      this.props.logResolvedChange(logId, respond.data.data.resolved);
      this.setState({ fetchedLogs: this.props.log });
    }
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

  //handle pagination
  handleChangePage = async (event, page) => {
    await this.setState({ page });

    this.getRelatedLogs(
      this.props.match.params.iid,
      this.props.match.params.id
    );
  };

  handleChangeRowsPerPage = async event => {
    const rows =
      event.target.value < this.state.pagination.rowCount
        ? event.target.value
        : this.state.pagination.rowCount;
    await this.setState({ rowsPerPage: rows });
    this.getRelatedLogs(
      this.props.match.params.iid,
      this.props.match.params.id
    );
  };

  //searching from searchbox data
  handleSearchQuery = async e => {
    await this.setState({ searchQuery: e.target.value });
    //fetch the query data
    this.getRelatedLogs(
      this.props.match.params.iid,
      this.props.match.params.id
    );
  };

  render() {
    return (
      <div>
        {/*header Component*/}
        <Header />
        {/*--------------*/}
        {/*REACT MODAL*/}
        <ReactModal
          isOpen={this.state.showModalChangeLog}
          onRequestClose={this.handleCloseModalChangeLog}
          className="modal-AddProject"
        >
          <form className="react-Modal">
            <div className="add-project-modal-header">
              CHANGE LOG
              <span onClick={this.handleCloseModalChangeLog}> X</span>
            </div>

            <div className="add-project-form-wrapper">
              <div>
                <label className="custom-select">
                  <select
                    name="projectId"
                    onChange={e => {
                      this.onChange(e);
                    }}
                    onClick={() =>
                      this.getAllProjectInstances(this.state.projectId)
                    }
                  >
                    <option key={'--'} value={'--'}>
                      SELECT PROJECTS
                    </option>
                    <option key={'all'} value={'all'}>
                      All
                    </option>
                    {this.state.allProjects.map(
                      (data, id) =>
                        data.project_id ===
                        parseInt(this.props.match.params.id, 10) ? (
                          <option
                            key={id}
                            value={data.project_id}
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
                </label>
              </div>

              <div>
                <label className="custom-select">
                  <select
                    name="logId"
                    onChange={e => {
                      this.onChange(e);
                    }}
                  >
                    <option key={'--'} value={'--'}>
                      SELECT INSTANCES
                    </option>
                    <option key={'all'} value={'all'}>
                      All
                    </option>
                    {this.state.fetchedAllProjectInstances.map(
                      (data, id) =>
                        data.id ===
                        parseInt(this.props.match.params.iid, 10) ? (
                          <option key={id} value={data.id} selected="selected">
                            {data.instance_name}
                          </option>
                        ) : (
                          <option key={id} value={data.id}>
                            {data.instance_name}
                          </option>
                        )
                    )}
                  </select>
                </label>
              </div>

              <button
                onClick={() => {
                  if (
                    (this.props.match.params.id === this.state.projectId &&
                      this.props.match.params.iid === this.state.logId) ||
                    this.state.projectId === '--' ||
                    this.state.logId === '--'
                  ) {
                  } else {
                    this.props.history.push({
                      pathname:
                        '/logs/' +
                        this.state.projectId +
                        '/' +
                        this.state.logId,
                    });
                  }

                  this.handleCloseModalChangeLog();
                }}
              >
                OK
              </button>
            </div>
            <div />
          </form>
        </ReactModal>
        {/*------------------------*/}

        {/*------------------materials modal log details*/}
        <Dialog
          fullScreen
          open={this.state.showModalLogDetails}
          onClose={this.handleCloseModalLogDetails}
          TransitionComponent={this.transition}
        >
          <DialogTitle id="log-head">
            <AppBar>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleCloseModalLogDetails}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                  LOG DETAILS
                </Typography>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent id="log-body">
            <div>
              <div>
                <div className="detail-wrapper">
                  <div className="log-head-title">
                    <div className="log-instance">
                      {this.state.logInstanceName}
                    </div>
                    <div className="log-date">{this.state.updated_at}</div>
                  </div>
                  <div className="log-Custom-message">
                    <div className="log-custom-message-label">
                      Custom Message
                    </div>
                    <div className="log-custom-message">
                      {this.state.customMessage}
                    </div>
                  </div>
                  <div className="log-details-wrapper">
                    <div className="log-label">LOGS</div>
                    <div className="log-detail-bottom">
                      <div className="log-type">{this.state.logName}</div>
                      <div className="log-message">{this.state.logMessage}</div>
                      <div className="log-stack">
                        <div>
                          {this.state.logStack.split('\n').map((item, key) => {
                            return (
                              <span key={key}>
                                {item}
                                <br />
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/*------------------------*/}
        <div className="dashboard-wrapper">
          <div className="project-name-add clearfix">
            <p>
              <img src={require('../img/log.png')} alt="log" />{' '}
              <span
                className="change-log"
                onClick={() => {
                  this.handleOpenModalChangeLog();
                  this.getAllProjectInstances(this.state.projectId);
                  this.getAllProjects();
                }}
              >
                LOGS <img src={require('../img/dropdown.png')} alt="dropdown" />
              </span>
            </p>

            <div className="project-log-id">
              <div>CURRENT PROJECT: {this.state.activeProject}</div>
              <div>CURRENT INSTANCE: {this.state.activeInstance}</div>
            </div>
          </div>

          <div />
          <input
            type="text"
            className="search-field"
            placeholder="search log type"
            value={this.state.searchQuery}
            onChange={e => {
              this.handleSearchQuery(e);
            }}
          />

          {this.displayProject()}

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
      </div>
    );
  }
}
