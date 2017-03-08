import React from 'react';
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';
import AuthService from './auth/AuthService.js';

import App from './App.js';
import Login from './auth/Login.js';
import Home from './Home.js';
import Profile from './profile/Profile.js';
var ChapTabs = require('./subject/chapter/ChapterView.js');


const auth = new AuthService('qMCf6J8kSiuC3T8sM8jBVT92CG2R7sIY', 'weebo.eu.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

var Routes = React.createClass({
    render: function () {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App} auth={auth}>
                    <IndexRedirect to="/home" />
                    <Route path="learn" component={ChapTabs} onEnter={requireAuth} />
                    <Route path="login" component={Login} />
                    <Route path="home" component={Home} onEnter={requireAuth} />
                    <Route path="profile" component={Profile} onEnter={requireAuth} />
                </Route>
            </Router>
        );

    }
});

module.exports = Routes;
