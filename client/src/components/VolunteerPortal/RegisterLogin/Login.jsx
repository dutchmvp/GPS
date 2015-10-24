import React from 'react';

class Login extends React.Component {
	submit(evt) {
		evt.preventDefault();
		
		console.log('submit!');
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
						<input type="password" className="form-control" id="password" />
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

export default Login;
