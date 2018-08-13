import { connect } from 'react-redux';
import logUI from './logUI';
import {
  logFetchBegin,
  logFetchError,
  logFetchSuccess,
} from '../actions/logAction';

const mapStateToProps = state => {
  return {
    isLogFetching: state.log.isLogFetching,
    logList: state.log.logList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLogFetchBegin: () => {
      dispatch(logFetchBegin());
    },
    setLogFetchSucess: () => {
      dispatch(logFetchSuccess());
    },
    setLogFetchError: msg => {
      dispatch(logFetchError(msg));
    },
  };
};

const log = connect(
  mapStateToProps,
  mapDispatchToProps
)(logUI);

export default log;
