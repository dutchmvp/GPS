import React from 'react';

// components
import Header from './volunteer-portal/Header.jsx';
import RegisterLogin from './volunteer-portal/RegisterLogin.jsx';
import Dashboard from './volunteer-portal/Dashboard.jsx';

class VolunteerPortalApp extends React.Component {
	constructor() {
		super(...arguments);

		this.state = {
			loggedIn: false
		};
	}

	render() {
		let userStatus = <RegisterLogin />;

		if (this.state.loggedIn) {
			userStatus = <Dashboard />;
		}

		return(
			<div>
				<Header isLoggedIn={this.state.loggedIn} />
				{userStatus}
			</div>
		);
	}
}

React.render(<VolunteerPortalApp />, document.body);
