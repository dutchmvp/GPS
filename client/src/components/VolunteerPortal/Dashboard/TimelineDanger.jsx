import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

class TimelineDanger extends AuthenticatedRoute {
	render() {
		return (
			<li>
				<div className="timeline-badge danger"></div>
				<div className="timeline-panel">
					<div className="timeline-heading">
						<h4 className="timeline-title">Alert sent</h4>
					</div>
					<div className="timeline-body">
						<p>Mrs Granny Smith generated an alert at 12:30pm</p>
					</div>
				</div>
			</li>
		);
	}
}

export default TimelineDanger;
