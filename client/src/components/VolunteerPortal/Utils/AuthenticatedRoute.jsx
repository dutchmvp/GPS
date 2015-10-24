import React from 'react';
import userService from '../../../actions/user-service';

class AuthenticatedRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	static willTransitionTo(transition) {		
		if (!userService.authenticated) {
			transition.redirect('login', {}, { 'nextPath': transition.path });
		}
	}
}

export default AuthenticatedRoute;
