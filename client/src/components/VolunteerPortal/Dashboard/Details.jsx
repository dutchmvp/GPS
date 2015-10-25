import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

// services
import UserService from '../../../actions/user-service';

class Details extends AuthenticatedRoute {
	constructor() {
		super();
		
		this.user = UserService.getUser();
	}

	render() {
		let allowed = ['FirstName', 'LastName', 'Email', 'PostCode']
		let details = [];

		// filter user data to those that are applicable
		for (var input in this.user) {
			if (allowed.indexOf(input) > -1) {
				details.push(<li>{input}: {this.user[input]}</li>);
			}
		}

		return (
			<div className="container">
				<div className="col-md-12">
					<p><strong>Your account details</strong></p>

					<ul>
						{details}
					</ul>
				</div>
			</div>
		);
	}
}

export default Details;
