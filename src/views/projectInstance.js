import { connect } from 'react-redux';
import {
  projectInstanceFetchBegin,
  projectInstanceFetchSuccess,
  projectInstanceFetchError,
  projectInstanceDeleteSuccess,
  projectInstanceCreateSuccess,
} from '../actions/adminActions';

import projectInstanceUI from './projectInstanceUI';

const mapStateToProps = state => {
  return {
    activeProject: state.project.project.currentProject,
    projectInstance: state.projectInstance.projectInstance.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
