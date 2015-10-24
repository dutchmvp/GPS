import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

class Details extends AuthenticatedRoute {
	submit(evt) {
		evt.preventDefault();
		
		console.log('submit!');
	}

	render() {
		return (
			<div className="container">
				<p>Details</p>
			</div>
		);
	}
}

export default Details;
