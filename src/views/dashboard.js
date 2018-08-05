import { connect } from "react-redux";

import DashboardUI from "./dashboardUI";

const mapStateToProps = state => {
  console.log("the state is ", state);
  return {
    islogin: state.user.islogin,
    accessToken: state.user.accessToken
  };
};

const Dashboard = connect(mapStateToProps)(DashboardUI);

export default Dashboard;
