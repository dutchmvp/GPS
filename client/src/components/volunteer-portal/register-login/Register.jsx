import React from 'react';

class Register extends React.Component {
	submit(evt) {
		evt.preventDefault();
		
		console.log('submit!');
	}
	
	render() {
		return (
			<form role="form" onSubmit={this.submit.bind(this)}>
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
					<label htmlFor="email">Email address:</label>
					<input type="email" className="form-control" id="email" />
				</div>
				<div className="form-group">
					<label htmlFor="postcode">Postcode:</label>
					<input type="text" className="form-control" id="postcode" />
				</div>
				<button type="submit" className="btn btn-default">Submit</button>
			</form>
		);
	}
}

export default Register;
