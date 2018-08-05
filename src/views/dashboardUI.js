import React from "react";
import * as jwt from "../utils/token";
import * as projectServices from "../services/projectServices";

import "./dashboard.css";

class DashboardUI extends React.Component {
  constructor() {
    super();

    this.state = {
      projectName: "",
      userEmail: null,
      list: []
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
      <div>
        Hello
        <strong> {this.state.userEmail} </strong>
      </div>
    );
  };

  onSubmit = () => {
    console.log("the project name is", this.state.projectName);

    //make an api call
    if (this.state.projectName === "") {
      console.log("empty ");
      return 1;
    }
    const respond = projectServices.createNewProject(
      this.state.projectName,
      this.state.userEmail
    );
    console.log("the api respond is ", respond);
    this.getProject(this.state.userEmail);
  };

  addNewProject = () => {
    return (
      <div className="add-new-project">
        <p>
          <strong>Add a new Project</strong>
        </p>
        <form>
          <label>Project Name : </label>
          <input
            value={this.state.projectName}
            onChange={this.onChange}
            type="text"
            name="projectName"
          />

          <div>
            <input
              type="submit"
              value="CREATE PROJECT"
              onClick={this.onSubmit}
            />
          </div>
        </form>
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
  };

  handleClick = e => {
    console.log("i am clicked", e.target.name);
    //route into the project instance of this project
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
      <div>
        <p>Your current Projects are:</p>
        {list.map(item => (
          <button
            key={item.id}
            name={item.project_name}
            onClick={this.handleClick}
          >
            {" "}
            {item.project_name}
          </button>
        ))}
      </div>
    );
  };
  render() {
    return (
      <div className="dashboard-wrapper">
        {this.displayUserName()}
        <p> welcome to dashboard</p>

        {this.addNewProject()}
        {this.displayProject(this.state.list)}
      </div>
    );
  }
}

export default DashboardUI;
