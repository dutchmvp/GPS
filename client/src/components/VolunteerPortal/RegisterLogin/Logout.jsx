import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

class Logout extends AuthenticatedRoute {
	constructor() {
		super();

		localStorage.removeItem('user');

		// login screen
		window.location = 'volunteer-portal.html';
	}
}

export default Logout;
