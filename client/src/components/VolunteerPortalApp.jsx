import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Route } from 'react-router';

// applications
import App from './VolunteerPortal/App';

// pages
import Dashboard from './VolunteerPortal/Dashboard';
import Details from './VolunteerPortal/Dashboard/Details';
import Volunteers from './VolunteerPortal/Dashboard/Volunteers';

import Register from './VolunteerPortal/RegisterLogin/Register';
import Login from './VolunteerPortal/RegisterLogin/Login';
import Logout from './VolunteerPortal/RegisterLogin/Logout';

let routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Dashboard} />
        <Route name="login" path="/login" handler={Login} />
        <Route name="register" path="/register" handler={Register} />
        <Route name="logout" path="/logout" handler={Logout}/>
        <Route name="details" path="/details" handler={Details}/>
        <Route name="volunteers" path="/volunteers" handler={Volunteers}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});
