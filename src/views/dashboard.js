import { connect } from 'react-redux';

import DashboardUI from './dashboardUI';

import {
  setCurrentProject,
  projectFetchSuccess,
  projectDeleteSuccess,
  projectCreateSuccess,
  projectUpdateBegin,
  projectUpdateError,
  projectUpdateSuccess,
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

    projectCreateSuccess: () => dispatch(projectCreateSuccess()),

    onDataFetched: data => {
      dispatch(projectFetchSuccess(data));
    },

    onDataDelete: () => {
      dispatch(projectDeleteSuccess());
    },

    projectUpdateSuccess: () => {
      dispatch(projectUpdateSuccess());
    },
    projectUpdateBegin: () => {
      dispatch(projectUpdateBegin());
    },
    projectUpdateError: () => {
      dispatch(projectUpdateError());
    },
  };
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardUI);

export default Dashboard;
