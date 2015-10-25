import React from 'react';
import AuthenticatedRoute from './Utils/AuthenticatedRoute';

// components
import Availability from './Dashboard/Availability';
import Timeline from './Dashboard/Timeline';

// services
import UserService from '../../actions/user-service';

class Dashboard extends AuthenticatedRoute {
	render() {
		return (
			<div className="container">
				<div className="col-md-8">
					<Timeline />
				</div>
				<div className="col-md-4">
					<div className="panel panel-default">
						<div className="panel-body">
							<Availability />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
