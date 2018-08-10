import { connect } from 'react-redux';
import { setLoginSuccess } from '../actions/loginoutActions';
import projectInstanceUI from './projectInstanceUI';

const mapStateToProps = state => {
  return {
    activeProject: state.project.project.currentProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoginSuccess: (accessToken, refreshToken) => {
      localStorage.setItem('RefreshToken', refreshToken);
      localStorage.setItem('AccessToken', accessToken);
      dispatch(setLoginSuccess(accessToken, refreshToken));
    },
  };
};

const logIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(projectInstanceUI);

export default logIn;
