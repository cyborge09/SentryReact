import { connect } from 'react-redux';
import {
  logFetchBegin,
  logFetchSuccess,
  logFetchError,
  logResolvedChange,
  logDeleteSuccess,
} from '../actions/adminActions';

import LogUI from './logUI';

const mapStateToProps = state => {
  return {
    userId: state.login.user.userId,
    projectInstance: state.projectInstance.projectInstance.data,
    log: state.logReducer.projectLogs.logs,
    userEmail: state.login.user.userEmail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logFetchBegin: () => {
      dispatch(logFetchBegin());
    },
    logFetchSuccess: logs => {
      dispatch(logFetchSuccess(logs));
    },
    logFetchError: () => {
      dispatch(logFetchError());
    },

    logResolvedChange: (logId, resolve) => {
      dispatch(logResolvedChange(logId, resolve));
    },

    logDeleteSuccess: () => {
      dispatch(logDeleteSuccess());
    },
  };
};

const log = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogUI);

export default log;
