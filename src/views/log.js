import { connect } from 'react-redux';
import {
  logFetchBegin,
  logFetchSuccess,
  logFetchError,
  logDeleteSuccess,
} from '../actions/adminActions';

import LogUI from './logUI';

const mapStateToProps = state => {
  return {
    userId: state.login.user.userId,
    projectInstance: state.projectInstance.projectInstance.data,
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
