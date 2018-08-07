import { connect } from "react-redux";

import DashboardUI from "./dashboardUI";
import { setCurrentProject, projectFetchSuccess} from "../actions/adminActions";

const mapStateToProps = state => {
  console.log("the state is ", state);
  return {
    islogin: state.login.user.islogin,
    accessToken: state.login.user.accessToken,
    data : state.admin.project.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProject: projectName => dispatch(setCurrentProject(projectName)),

    onDataFetched: (data) => {
      dispatch(projectFetchSuccess(data))
  }
  };
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardUI);

export default Dashboard;
