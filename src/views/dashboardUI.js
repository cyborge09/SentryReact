import React from 'react';
import ReactModal from 'react-modal';
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
      return 1;
    }
    const respond = await projectServices.createNewProject(
      this.state.projectName,
      this.state.userEmail
    );

    if (respond.status === 201) {
      this.setState({ projectName: '' });
      this.getProject(this.state.userEmail);
    }
  };

  addNewProject = () => {
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
                  ADD PROJECT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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

  handleDeleteClick = async (PID, projectName) => {
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

        {/* react modal for Add project */}

        <ReactModal
          isOpen={this.state.showModalAddProject}
          onRequestClose={this.handleCloseModalAddProject}
          className="modal-AddProject"
        >
          <form
            className="react-Modal"
            onSubmit={() => {
              this.handleCloseModalAddProject();
              this.onSubmit();
            }}
          >
            <div className="add-project-modal-header">
              ADD NEW PROJECT
              <span onClick={this.handleCloseModalAddProject}> X</span>
            </div>

            <div className="add-project-form-wrapper">
              <input
                value={this.state.projectName}
                onChange={this.onChange}
                type="text"
                name="projectName"
                placeholder="PROJECT NAME"
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

        {/* react modal for Add project end */}

        {/* react modal for Delete project */}
        <ReactModal
          isOpen={this.state.showModalDeleteProject}
          onRequestClose={this.handleCloseModalDeleteProject}
          className="modal-AddProject"
        >
          <form
            className="react-Modal"
            onSubmit={() => {
              if (this.state.confirm === 'CONFIRM') {
                this.handleCloseModalDeleteProject();
                this.handleDeleteClick(
                  this.state.toDeleteProjectId,
                  this.state.toDeleteProjectName
                );
              } else {
                this.setState({ confirm: '' });
                this.handleCloseModalDeleteProject();
              }
            }}
          >
            <div className="add-project-modal-header">
              DELETE PROJECT
              <span onClick={this.handleCloseModalDeleteProject}> X</span>
            </div>

            <div className="add-project-form-wrapper">
              <div className="delete-Info">
                <img src={require('../img/deletePROJECT.png')} alt="delete" />
                <span>PROJECT NAME: {this.state.toDeleteProjectName}</span>
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
                onClick={() => {
                  if (this.state.confirm === 'CONFIRM') {
                    this.setState({ confirm: '' });
                    this.handleCloseModalDeleteProject();
                    this.handleDeleteClick(
                      this.state.toDeleteProjectId,
                      this.state.toDeleteProjectName
                    );
                  } else {
                    this.setState({ confirm: '' });
                    this.handleCloseModalDeleteProject();
                  }
                }}
              >
                CONFIRM
              </button>
            </div>
          </form>
        </ReactModal>

        {/* react modal for Delete project ends */}
        {this.displayUserName()}

        <div className="dashboard-wrapper ">
          <div className="show-add-project">
            <div className="project"> PROJECTS</div>
            {this.addNewProject()}
          </div>

          {this.displayProject(this.props.data)}
        </div>
      </div>
    );
  }
}

export default DashboardUI;
