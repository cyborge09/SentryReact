import { connect } from "react-redux";

import DashboardUI from "./dashboardUI";
import { setCurrentProject } from "../actions/adminActions";

const mapStateToProps = state => {
  console.log("the state is ", state);
  return {
    islogin: state.login.user.islogin,
    accessToken: state.login.user.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProject: projectName => dispatch(setCurrentProject(projectName))
  };
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardUI);

export default Dashboard;
