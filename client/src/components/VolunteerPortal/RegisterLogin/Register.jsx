import React from 'react';
import UnAuthenticatedRoute from '../Utils/UnAuthenticatedRoute';
import userService from '../../../actions/user-service';

class Register extends UnAuthenticatedRoute {
	constructor() {
		super();
	}

	submit(evt) {
		evt.preventDefault();

		let data = {};

		// build up data/validation
		let inputs = evt.target.querySelectorAll('input');

		for (let i = 0; i < inputs.length; i++) {
			let input = inputs[i];

			if (!input.value.length) {
				input.parentNode.classList.add('has-error');
			}
			else {
				input.parentNode.classList.remove('has-error');
				input.parentNode.classList.add('has-success');
			}

			data[input.getAttribute('id')] = input.value;
		}

		userService.register(data).then(function(response) {
			console.log(response);
		});
	}
	
	render() {
		return (
			<div className="container">
				<form role="form" onSubmit={this.submit.bind(this)} enctype="multipart/form-data">
					<div className="form-group">
						<label htmlFor="email">Email address:</label>
						<input type="email" className="form-control" id="email" />
					</div>
					<div className="form-group">
						<label htmlFor="postcode">Password:</label>
						<input type="password" className="form-control" id="password" />
					</div>
					<div className="form-group">
						<label htmlFor="first-name">First Name:</label>
						<input type="text" className="form-control" id="first-name" />
					</div>
					<div className="form-group">
						<label htmlFor="last-name">Last Name:</label>
						<input type="text" className="form-control" id="last-name" />
					</div>
					<div className="form-group">
						<label htmlFor="mobile">Mobile Number:</label>
						<input type="text" className="form-control" id="mobile" />
					</div>
					<div className="form-group">
						<label htmlFor="postcode">Postcode:</label>
						<input type="text" className="form-control" id="postcode" />
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

export default Register;
