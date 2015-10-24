import React from 'react';

class Alerts extends React.Component {
	submit(evt) {
		evt.preventDefault();
		
		console.log('submit!');
	}

	render() {
		return (
			<div className="container">
				<p>Alerts</p>
			</div>
		);
	}
}

export default Alerts;
