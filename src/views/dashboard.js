import { connect } from 'react-redux';

import DashboardUI from './dashboardUI';
import {
  setCurrentProject,
  projectFetchSuccess,
  projectDeleteSuccess,
} from '../actions/adminActions';

const mapStateToProps = state => {
  return {
    islogin: state.login.user.islogin,
    accessToken: state.login.user.accessToken,
    data: state.project.project.data,
    userEmail: state.login.user.userEmail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProject: projectName => dispatch(setCurrentProject(projectName)),

    onDataFetched: data => {
      dispatch(projectFetchSuccess(data));
    },

    onDataDelete: () => {
      dispatch(projectDeleteSuccess());
    },
  };
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardUI);

export default Dashboard;
