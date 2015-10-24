import React from 'react';
import { RouteHandler } from 'react-router';

// styles
import "../../styles/global";

// components
import Header from './Header';

class App extends React.Component {
	constructor() {
		super(...arguments);

		this.state = {
			loggedIn: false
		};
	}

	render() {
		return (
			<div>
				<Header isLoggedIn={this.state.loggedIn} />
				<RouteHandler />
				<div className="container footer">
					<p className="col-md-6">Team name: 3J1D</p>
					<p className="col-md-6 event">HackManchester 2015</p>
				</div>
			</div>
		);
	}
}

export default App;
