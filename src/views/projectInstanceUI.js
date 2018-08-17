import React, { Component } from 'react';
import * as projectInstanceServices from '../services/projectInstanceServices';
import * as logServices from '../services/logServices';
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
      fetchedLogs: [],
      activeProject: '',
      fetchedProjectInstances: [],
    };
  }

  handleOpenModalAddProject = () => {
    this.setState({ showModalAddProject: true });
  };

  handleCloseModalAddProject = () => {
    this.setState({ showModalAddProject: false });
  };

  //to fetch and display project instances//
  async componentDidMount() {
    ReactModal.setAppElement('body');
    console.log('pros', this.props);
    this.getProjectName(this.props.match.params.id);
    this.setState({
      activeProject: await this.getProjectName(this.props.match.params.id),
    });

    this.getProjectInstances(this.props.match.params.id);
  }

  getProjectName = async projectID => {
    console.log(projectID, 'pid');
    const respond = await projectInstanceServices.getRelatedProjectName(
      projectID
    );
    return respond.data.data.project_name;
  };

  getProjectInstances = async projectID => {
    this.props.projectInstanceFetchBegin();
    const respond = await projectInstanceServices.getRelatedProjectInstances(
      projectID
    );

    if (respond.status === 200) {
      this.setState({ fetchedProjectInstances: respond.data.data });
      this.props.projectInstanceFetchSuccess(respond.data.data);
    } else {
      this.props.projectInstanceFetchError(respond.status);
    }
  };

  displayProjectInstances = projectInstances => {
    if (projectInstances.length === 0) {
      return <div>No Project-Instances yet!</div>;
    }
    return (
      <ProjectInstanceTable
        data={projectInstances}
        copyInstanceKey={this.copyInstanceKey}
        // handleClick={this.handleClick}
        // handleDeleteClick={this.handleDeleteClick}
        // handleDeleteClick={this.handleOpenModalDeleteProject}
      />
    );
  };
  //----------------------------------------------------------//

  addNewProjectInstance = () => {
    return (
      <div>
        <div className="clearfix">
          <div className="add-new-project">
            <form>
              <div className="search-btn">
                <button
                  type="button"
                  value="CREATE PROJECT"
                  onClick={this.handleOpenModalAddProject}
                >
                  ADD PROJECT INSTANCE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    // {
    //   this.displayRelatedLogs(this.props.activeProject);
    // }
  };

  displayRelatedLogs = async projectName => {
    const relatedLogsList = await logServices
      .fetchRelatedLogs(this.props.activeProject)
      .then(data => {
        return data.data.data;
      });

    this.setState({
      fetchedLogs: relatedLogsList,
    });
  };

  displayLogs = () => {
    return (
      <div>
        The related Logs are:
        {this.state.fetchedLogs.map(index => (
          <li>
            {' '}
            {index.type}
            {index.message}
          </li>
        ))}
      </div>
    );
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
      this.getProjectInstances(this.props.match.params.id);
    }
    // this.setState({
    //   instanceKey: respond.instance_key,
    // });
  };

  render() {
    return (
      <div>
        {/*header Component*/}
        <Header />
        {/*Add Project Instances modal*/}
        <ReactModal
          isOpen={this.state.showModalAddProject}
          onRequestClose={this.handleCloseModalAddProject}
          className="modal-AddProject"
        >
          <form className="react-Modal" onSubmit={this.onSubmit}>
            <div className="add-project-modal-header">
              ADD PROJECT INSTANCE
              <span onClick={this.handleCloseModalAddProject}> X</span>
            </div>

            <div className="add-project-form-wrapper">
              <input
                value={this.state.projectName}
                onChange={this.onChange}
                type="text"
                name="instanceName"
                placeholder="INSTANCE NAME"
              />
              <button
                onClick={() => {
                  this.handleCloseModalAddProject();
                  this.onSubmit();
                }}
              >
                Create
              </button>
            </div>
          </form>
        </ReactModal>

        <div className="dashboard-wrapper">
          <p> Project : {this.state.activeProject}</p>
          {this.addNewProjectInstance()}
        </div>

        {/*this.displayLogs()*/}

        {this.displayProjectInstances(this.props.projectInstance)}
      </div>
    );
  }
}
