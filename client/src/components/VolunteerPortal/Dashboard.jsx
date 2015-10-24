import React from 'react';
import AuthenticatedRoute from './Utils/AuthenticatedRoute';

class Dashboard extends AuthenticatedRoute {
	render() {
		return (
			<div className="container">
				Dashboard
			</div>
		);
	}
}

export default Dashboard;
