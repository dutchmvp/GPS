import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

class Alerts extends AuthenticatedRoute {
	submit(evt) {
		evt.preventDefault();
		
		console.log('submit!');
	}

	render() {
		return (
			<div className="container">
				<p>Alerts</p>
			</div>
		);
	}
}

export default Alerts;
