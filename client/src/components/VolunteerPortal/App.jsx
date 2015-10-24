import React from 'react';
import { RouteHandler } from 'react-router';

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
			</div>
		);
	}
}

export default App;
