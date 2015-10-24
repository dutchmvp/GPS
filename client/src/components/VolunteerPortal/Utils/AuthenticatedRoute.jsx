import React from 'react';
import UserService from '../../../actions/user-service';

class AuthenticatedRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	static willTransitionTo(transition) {			
		if (!UserService.authenticated) {
			transition.redirect('login', {}, { 'nextPath': transition.path });
		}
	}
}

export default AuthenticatedRoute;
