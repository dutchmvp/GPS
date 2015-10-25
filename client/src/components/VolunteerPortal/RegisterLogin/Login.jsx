import React from 'react';
import UnAuthenticatedRoute from '../Utils/UnAuthenticatedRoute';
import UserService from '../../../actions/user-service';

class Login extends UnAuthenticatedRoute {
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

		if (evt.target.querySelectorAll('.has-error').length == 0) {
			UserService.login(data).then((response) => {
				// dashboard time
				window.location = 'volunteer-portal.html';
			});
		}
	}

	render() {
		return (
			<div className="container">
				<form role="form" onSubmit={this.submit.bind(this)}>
					<div className="form-group">
						<label htmlFor="email">Email address:</label>
						<input type="text" className="form-control" id="email" />
					</div>
					<div className="form-group">
						<label htmlFor="last-name">Password:</label>
						<input type="password" className="form-control" id="passwordhash" />
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

export default Login;
