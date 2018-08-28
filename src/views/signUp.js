import { connect } from 'react-redux';
import {
  setSignUpSuccess,
  setSignUpBegin,
  setSignUpError,
} from '../actions/loginoutActions';
import SignUpUI from './signUpUI';

const mapStateToProps = state => {
  return {
    signingUp: state.login.user.signingUp,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSignUpBegin: () => {
      dispatch(setSignUpBegin());
    },

    setSignUpSuccess: () => {
      dispatch(setSignUpSuccess());
    },

    setSignupError: () => {
      dispatch(setSignUpError());
    },
  };
};

const logIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpUI);

export default logIn;
