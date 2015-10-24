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
				<ul className="nav navbar-nav navbar-right">
					<li><Link to="details">My Details</Link></li>
					<li><Link to="logout">Logout</Link></li>
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
						<Link to="/" className="navbar-brand">GPS</Link>
					</div>

					{pageNavigation}
					{userNavigation}
				</div>
			</div>
		);
	}
}

export default Header;
