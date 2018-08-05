import React from "react";
import * as jwt from "../utils/token";
import * as projectServices from "../services/projectServices";

class DashboardUI extends React.Component {
  constructor() {
    super();

    this.state = {
      projectName: "",
      userEmail: null
    };
  }
  componentDidMount() {
    console.log("the props in DashBoardUI is", this.props.accessToken);
    // const accessToken = this.props.accessToken;
    const localAccessToken = localStorage.getItem("AccessToken");
    const result = jwt.verifyAccessToken(localAccessToken);
    this.setState({
      userEmail: result.payload.email
    });
    console.log("the user email is", result.payload.email);
    this.displayProject(result.payload.email);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  displayUserName = () => {
    return (
      <div>
        Hello Mr
        <strong> {this.state.userEmail} </strong>
      </div>
    );
  };

  addNewProject = () => {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Project Name : </label>
          <input
            value={this.state.projectName}
            onChange={this.onChange}
            type="text"
            name="projectName"
          />

          <div>
            <input type="submit" value="ADD PROJECT" />
          </div>
        </form>
      </div>
    );
  };

  displayProject = async email => {
    let respond = await projectServices
      .fetchRelatedProjects(email)
      .then(res => res.data.data);

    console.log("the related projects were ", respond);
  };
  render() {
    return (
      <div>
        {this.displayUserName()}

        <div> welcome to dashboard</div>
        {this.addNewProject()}
      </div>
    );
  }
}

export default DashboardUI;
