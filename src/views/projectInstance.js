import { connect } from 'react-redux';
import {
  setCurrentProject,
  projectInstanceFetchBegin,
  projectInstanceFetchSuccess,
  projectInstanceFetchError,
  projectInstanceDeleteSuccess,
  projectInstanceCreateSuccess,
} from '../actions/adminActions';

import projectInstanceUI from './projectInstanceUI';

const mapStateToProps = state => {
  return {
    userId: state.login.user.userId,
    projectInstance: state.projectInstance.projectInstance.data,
    userEmail: state.login.user.userEmail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProject: projectName => {
      dispatch(setCurrentProject(projectName));
    },
    projectInstanceFetchBegin: () => {
      dispatch(projectInstanceFetchBegin());
    },
    projectInstanceFetchSuccess: projectInstances => {
      dispatch(projectInstanceFetchSuccess(projectInstances));
    },
    projectInstanceFetchError: error => {
      dispatch(projectInstanceFetchError(error));
    },
    projectInstanceDeleteSuccess: () => {
      dispatch(projectInstanceDeleteSuccess());
    },
    projectInstanceCreateSuccess: () => {
      dispatch(projectInstanceCreateSuccess());
    },
  };
};

const projectInstance = connect(
  mapStateToProps,
  mapDispatchToProps
)(projectInstanceUI);

export default projectInstance;
