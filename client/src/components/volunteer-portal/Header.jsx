import React from 'react';

class Header extends React.Component {
	render() {
		let userNavigation = (
			<ul className="nav navbar-nav navbar-right">
				<li><a href="">Login</a></li>
				<li><a href="">Register</a></li>
			</ul>
		), pageNavigation = null;

		if (this.props.isLoggedIn) {
			userNavigation = (
				<ul>
					<li><a href="">My Details</a></li>
				</ul>
			)

			pageNavigation = (
				<ul className="nav navbar-nav">
					<li><a href="">Current Alerts</a></li>
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
