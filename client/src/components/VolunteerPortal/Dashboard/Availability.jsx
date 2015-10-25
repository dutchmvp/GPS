import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

// components
import SwitchAvailability from './SwitchAvailability';

// services
import UserService from '../../../actions/user-service';

class Avialability extends AuthenticatedRoute {
	constructor() {
		super();
		
		this.user = UserService.getUser();
	}

	switch(evt) {
		evt.preventDefault();

		UserService.switchAvailability().then(() => {
			this.user = UserService.getUser(); // re-get user
			this.forceUpdate();
		});
	}

	render() {
		let currentAvailability = this.user.Availability,
			availability = 'You are currently not availabile for calls';

		if (currentAvailability) {
			availability = 'You are currently availabile for calls';
		}

		return (
			<div>
				<p>{availability}</p>
				<SwitchAvailability availability={currentAvailability} onSwitch={this.switch.bind(this)} />
			</div>
		);
	}
}

export default Avialability;
