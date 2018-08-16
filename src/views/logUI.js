import React, { Component } from 'react';
import * as logServices from '../services/logServices';
import * as projectServices from '../services/projectServices';
import * as projectInstanceServices from '../services/projectInstanceServices';
import Header from '../component/Header';
import LogTable from '../component/logTable';
import ReactModal from 'react-modal';

export default class Log extends Component {
  constructor() {
    super();
    this.state = {
      fetchedLogs: [],
      showModalChangeLog: false,
      allProjects: [],
      projectId: '--',
      logId: '--',
      fetchedAllProjectInstances: [],
    };
  }

  handleOpenModalChangeLog = () => {
    this.setState({ showModalChangeLog: true });
  };

  handleCloseModalChangeLog = () => {
    this.setState({
      showModalChangeLog: false,
      projectId: '--',
      logId: '--',
    });
  };

  componentDidMount = () => {
    ReactModal.setAppElement('body');

    this.getRelatedLogs(
      this.props.match.params.iid,
      this.props.match.params.id
    );
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
        console.log('error', err);
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
      this.props.userId
    );
    if (respond.status === 200) {
      this.props.logFetchSuccess(respond.data.data);
      this.setState({
        fetchedLogs: respond.data.data,
      });
    } else {
      this.props.logFetchError(respond.status);
    }
  };

  displayProject = () => {
    var logList = this.state.fetchedLogs;
    if (logList.length === 0) {
      return <div>NO LOGS!!!!</div>;
    }
    return (
      <LogTable
        data={logList}
        handleChangeStatus={this.handleChangeStatus}
        // handleClick={this.handleClick}
        // handleDeleteClick={this.handleOpenModalDeleteProject}
      />
    );
  };

  handleChangeStatus = async logId => {
    const respond = await logServices.changeStatus(logId);
    if (respond.status === 204) {
      //dispatch action
    }
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
                    {this.state.allProjects.map((data, id) => (
                      <option key={id} value={data.project_id}>
                        {data.project_name}
                      </option>
                    ))}
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
                    {this.state.fetchedAllProjectInstances.map((data, id) => (
                      <option key={id} value={data.id}>
                        {data.instance_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                onClick={() => {
                  if (
                    this.state.projectId !== '--' &&
                    this.state.logId !== '--' &&
                    this.state.projectId !== this.props.match.params.id &&
                    this.state.logId !== this.props.match.params.iid
                  ) {
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
                LOGS <img src={require('../img/click.png')} alt="click" />
              </span>
            </p>
          </div>
        </div>
        {this.displayProject()}
      </div>
    );
  }
}
