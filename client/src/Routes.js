import React from 'react';
import {Router, Route, browserHistory, IndexRedirect, Redirect} from 'react-router';
import AuthService from './auth/AuthService.js';

import App from './App.js';
import Login from './auth/Login.js';
import Home from './home/Home.js';
import Profile from './profile/Profile.js';
import Admin from './admin/Admin.js';
import Unauthorized from './error/Unauthorized.js';
import PageNotFound from './error/PageNotFound.js';
import ChapterView from './subject/chapter/ChapterView.js';
import About from './about/About.js';
import Contact from './about/Contact.js';

const auth = new AuthService('qMCf6J8kSiuC3T8sM8jBVT92CG2R7sIY', 'weebo.eu.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

// onEnter callback to require admin role
const requireAdminAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
      replace({ pathname: '/login' })
    } else if (!auth.isAdmin()) {
        replace({ pathname: '/unauthorized' })
    }
}

/**
 * Compontent handling the frontend routing
 */
var Routes = React.createClass({
    render: function () {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App} auth={auth}>
                    <IndexRedirect to="/home" />
                    <Route path="learn" component={ChapterView} onEnter={requireAuth} />
                    <Route path="home" component={Home} onEnter={requireAuth} />
                    <Route path="profile" component={Profile} onEnter={requireAuth} />
                    <Route path="about" component={About} onEnter={requireAuth} />
                    <Route path="contact" component={Contact} onEnter={requireAuth} />
                    <Route path="admin" component={Admin} onEnter={requireAdminAuth} />
                    <Route path="unauthorized" component={Unauthorized} onEnter={requireAuth} />
                    <Route path="404" component={PageNotFound} onEnter={requireAuth} />
                </Route>
                <Route path="/login" component={Login} auth={auth}/>
                <Redirect from='*' to='/404' />
            </Router>
        );

    }
});

module.exports = Routes;
