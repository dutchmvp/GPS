import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

class TimelineDanger extends AuthenticatedRoute {
	render() {
		let textMessage = (<p>Mrs Granny Smith's heart rate fell below 50bpm for 1 hour at 11:00pm</p>);

		if (this.props.inverted) {
			textMessage = (<p>Mrs Granny Smith has left her geo-fenced area</p>);
		}
		return (
			<li className={(this.props.inverted) ? 'timeline-inverted' : ''}>
				<div className="timeline-badge warning"></div>
				<div className="timeline-panel">
					<div className="timeline-heading">
						<h4 className="timeline-title">Warning</h4>
					</div>
					<div className="timeline-body">
						{textMessage}
					</div>
				</div>
			</li>
		);
	}
}

export default TimelineDanger;
