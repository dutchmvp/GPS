import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

class TimelineDanger extends AuthenticatedRoute {
	render() {
		return (
			<li className={(this.props.inverted) ? 'timeline-inverted' : ''}>
				<div className="timeline-badge warning"></div>
				<div className="timeline-panel">
					<div className="timeline-heading">
						<h4 className="timeline-title">Warning</h4>
					</div>
					<div className="timeline-body">
						<p>Mrs Granny Smith's heart rate fell below 50bpm for 1 hour at 11:00pm</p>
					</div>
				</div>
			</li>
		);
	}
}

export default TimelineDanger;
