import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
	render() {
		let userNavigation = (
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="login">Login</Link></li>
				<li><Link to="register">Register</Link></li>
			</ul>
		), pageNavigation = null;

		if (this.props.isLoggedIn) {
			userNavigation = (
				<ul>
					<li><Link to="details">My Details</Link></li>
				</ul>
			)

			pageNavigation = (
				<ul className="nav navbar-nav">
					<li><Link to="alerts">Alerts</Link></li>
				</ul>
			)
		}

		return (
			<div className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<a href="" className="navbar-brand">GPS</a>
					</div>

					{pageNavigation}
					{userNavigation}
				</div>
			</div>
		);
	}
}

export default Header;
