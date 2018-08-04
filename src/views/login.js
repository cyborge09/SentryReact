import { connect } from 'react-redux';
import LoginUI from './loginUI';

const mapStateToProps = state => {
    return {

        islogin: state.loginReducer.user.islogin,
        accessToken: state.loginReducer.user.accessToken,
        refreshToken: state.loginReducer.user.refreshToken

    };
};

const mapDispatchToProps = dispatch => {
    return 0;
}

const logIn = connect(mapStateToProps, mapDispatchToProps)(LoginUI);

export default logIn;