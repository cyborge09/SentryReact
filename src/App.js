import './css/App.css';
import './css/Header.css';
import './css/UserActionHeader.css';
import './css/ToggleBar.css';
import './css/LogModal.css';
import store from './store';
import MainComponent from './views/MainComponent';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

class App extends Component {
	// constructor() {
	// 	super();
	// 	const socket = socketIOClient('http://127.0.0.1:8848');
	// 	socket.emit('change color', 'white'); // change 'red' to this.state.color
	// 	socket.on('data', data => {
	// 		console.log(data, 'dfsdfsa');
	// 		this.setState({ socketMessage: data });
	// 	});
	// }

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route component={MainComponent} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
