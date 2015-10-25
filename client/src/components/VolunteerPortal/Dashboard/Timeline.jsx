import React from 'react';
import AuthenticatedRoute from '../Utils/AuthenticatedRoute';

// styles
import './timeline.css';

// components
import TimelineDanger from './TimelineDanger';
import TimelineWarning from './TimelineWarning';

class Timeline extends AuthenticatedRoute {
	render() {
		let counter = 1;
		
		return (
			<ul className="timeline">
				<TimelineDanger inverted={(counter++ % 2 == 0)} />
				<TimelineWarning inverted={(counter++ % 2 == 0)} />
				<TimelineWarning inverted={(counter++ % 2 == 0)} />
			</ul>
		);
	}
}

export default Timeline;
