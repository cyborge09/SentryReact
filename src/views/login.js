import { connect } from 'react-redux';
import LoginUI from './loginUI';

const mapStateToProps = state => {
    return 0;
};

const mapDispatchToProps = dispatch => {
    return 0;
}

const logIn = connect(mapStateToProps, mapDispatchToProps)(LoginUI);

export default logIn;