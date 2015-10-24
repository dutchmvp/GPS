import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Route } from 'react-router';

// applications
import App from './VolunteerPortal/App';

// pages
import Dashboard from './VolunteerPortal/Dashboard';
import Details from './VolunteerPortal/Dashboard/Details';
import Alerts from './VolunteerPortal/Dashboard/Alerts';

import Register from './VolunteerPortal/RegisterLogin/Register';
import Login from './VolunteerPortal/RegisterLogin/Login';

let routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Dashboard} />
        <Route name="login" path="/login" handler={Login} />
        <Route name="register" path="/register" handler={Register} />
        <Route name="details" path="/details" handler={Details}/>
        <Route name="alerts" path="/alerts" handler={Alerts}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});