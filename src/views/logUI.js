import React, { Component } from 'react';
import * as logServices from '../services/logServices';
import Header from '../component/Header';
import LogTable from '../component/logTable';

export default class ProjectInstance extends Component {
  constructor() {
    super();
    this.state = {
      fetchedLogs: [],
      activeProject: '',
    };
  }
  componentDidMount = () => {
    this.getRelatedLogs(
      this.props.match.params.iid,
      this.props.match.params.id
    );
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getRelatedLogs = async (instanceId, projectId) => {
    this.props.logFetchBegin();
    const respond = await logServices.fetchRelatedLogs(instanceId, projectId);
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
        {this.displayProject()}
      </div>
    );
  }
}
