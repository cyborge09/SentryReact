import { connect } from 'react-redux';
import { setLoginSuccess } from '../actions/loginoutActions';
import LoginUI from './loginUI';

const mapStateToProps = state => {
  return {
    isLogin: state.login.user.isLogin,
    accessToken: state.login.user.accessToken,
    refreshToken: state.login.user.refreshToken,
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
)(LoginUI);

export default logIn;
