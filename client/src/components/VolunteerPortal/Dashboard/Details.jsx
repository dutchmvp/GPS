import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

class Details extends AuthenticatedRoute {
	render() {
		let allowed = ['FirstName', 'LastName', 'Email', 'PostCode']
		let user = JSON.parse(localStorage.getItem('user'));
		let details = [];

		// filter user data to those that are applicable
		for (var input in user) {
			if (allowed.indexOf(input) > -1) {
				details.push(<li>{input}: {user[input]}</li>);
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
