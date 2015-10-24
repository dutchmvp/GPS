import React from 'react';

class Details extends React.Component {
	submit(evt) {
		evt.preventDefault();
		
		console.log('submit!');
	}

	render() {
		return (
			<div className="container">
				<p>Details</p>
			</div>
		);
	}
}

export default Details;
