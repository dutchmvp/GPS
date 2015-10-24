import React from 'react';

// components
import Register from './register-login/Register.jsx';
import Login from './register-login/Login.jsx';

class RegisterLogin extends React.Component {
	render() {
		return (
			<div className="container">
				<Register />
				<Login />
			</div>
		);
	}
}

export default RegisterLogin;
