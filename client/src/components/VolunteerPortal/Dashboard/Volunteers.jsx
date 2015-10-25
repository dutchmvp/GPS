import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';
import VolunteerService from '../../../actions/volunteer-service';

class Volunteers extends AuthenticatedRoute {
	constructor() {
		super();

		this.VolunteerService = new VolunteerService();
		this.getAll();
	}

	getAll() {
		this.VolunteerService.getAll().then((response) => {
			this.volunteers = response;
			this.forceUpdate();
		});
	}

	render() {
		let volunteers = (
			<tr>
				<td colSpan="5">Loading...</td>
			</tr>
		);

		if (this.volunteers && this.volunteers.length > 0) {
			volunteers = this.volunteers.map(function(volunteer, index) {
				let isAvialable = 'No';

				if (volunteer.Availability) {
					isAvialable = 'Yes';
				}

				return (
					<tr>
						<td>{volunteer.FirstName}</td>
						<td>{volunteer.LastName}</td>
						<td>{volunteer.Email}</td>
						<td>{volunteer.PostCode}</td>
						<td>{isAvialable}</td>
					</tr>
				);
			}, this);
		}

		return (
			<div className="container">
				<div className="col-md-12">
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Email</th>
								<th>Post Code</th>
								<th>Availability</th>
							</tr>
						</thead>
						<tbody>
							{volunteers}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Volunteers;
