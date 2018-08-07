import React from "react";
import * as jwt from "../utils/token";
import * as projectServices from "../services/projectServices";
import Table from "../component/ProjectTable";
import Header from "../component/Header";

class DashboardUI extends React.Component {
  constructor() {
    super();

    this.state = {
      projectName: "",
      userEmail: null
    };
  }
  componentDidMount() {
    // const accessToken = this.props.accessToken;
    const localAccessToken = localStorage.getItem("AccessToken");
    const result = jwt.verifyAccessToken(localAccessToken);
    this.setState({
      userEmail: result.payload.email
    });
    console.log("the user email is", result.payload.email);
    this.getProject(result.payload.email);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  displayUserName = () => {
    return (
      <div className="header">
        <div className="header-wrapper clearfix">
          <div className="title">PROJECT DASHBOARD</div>
          <div className="user">
            <strong> WELCOME {this.state.userEmail} </strong>
          </div>
        </div>
      </div>
    );
  };

  onSubmit = async () => {
    console.log("the project name is", this.state.projectName);

    //make an api call
    if (this.state.projectName === "") {
      console.log("empty ");
      return 1;
    }
    const respond = await projectServices.createNewProject(
      this.state.projectName,
      this.state.userEmail
    );
    console.log("the api respond is ", respond);
    this.getProject(this.state.userEmail);
  };

  addNewProject = () => {
    return (
      <div>
        <div className="clearfix">
          <div className="add-new-project">
            <form>
              <input
                value={this.state.projectName}
                onChange={this.onChange}
                type="text"
                name="projectName"
                placeholder="PROJECT NAME"
              />

              <div className="search-btn">
                <button
                  type="button"
                  value="CREATE PROJECT"
                  onClick={this.onSubmit}
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
      list: respond
    });
    console.log("the related projects were ", this.state.list);
    if (this.state.list !== []) {
      //callback function for project data fetch success
      this.props.onDataFetched(this.state.list);
    }
  };

  displayProject = list => {
    console.log("list", list);
    if (list.length === 0) {
      return (
        <div>
          Seems like you have no project yet! lets get started by adding project
        </div>
      );
    }
    return <Table data={list} handleClick={this.handleClick} />;
  };

  handleClick = projectName => {
    console.log("i am clicked", projectName);
    this.props.setCurrentProject(projectName);
    this.props.history.push(`/projectInstance`);
  };

  handle;

  render() {
    return (
      <div>
        <Header {...this.props} />
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
