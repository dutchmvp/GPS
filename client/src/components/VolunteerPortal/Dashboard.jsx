import React from 'react';
import AuthenticatedRoute from './Utils/AuthenticatedRoute';

class Dashboard extends AuthenticatedRoute {
	render() {
		return (
			<div className="container">
				<p>Dashboard</p>
			</div>
		);
	}
}

export default Dashboard;
