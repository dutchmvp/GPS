import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

// services
import UserService from '../../../actions/user-service';

class SwitchAvialability extends AuthenticatedRoute {
	constructor() {
		super();
		
		this.user = UserService.getUser();
	}

	render() {
		let buttonText = 'Turn Off';

		if (!this.props.availability) {
			buttonText = 'Turn On';
		}

		return (
			<div className="btn-group">
				<button type="button" className="btn btn-default" onClick={this.props.onSwitch}>{buttonText}</button>
			</div>
		);
	}
}

export default SwitchAvialability;
