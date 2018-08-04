import { connect } from 'react-redux';
import { setLoginSuccess } from '../actions/loginoutActions';
import LoginUI from './loginUI';

const mapStateToProps = state => {
    console.log("state",state)
    return {

        islogin: state.user.islogin,
        accessToken: state.user.accessToken,
        refreshToken: state.user.refreshToken

    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoginSuccess: (accessToken, refreshToken) => {
            localStorage.setItem("RefreshToken", refreshToken);
            localStorage.setItem("AccessToken", accessToken);
            dispatch(setLoginSuccess(accessToken, refreshToken)
            )
        }
    }
}

const logIn = connect(mapStateToProps, mapDispatchToProps)(LoginUI);

export default logIn;