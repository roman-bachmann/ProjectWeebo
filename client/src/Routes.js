import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './App.js';
import Login from './Login.js';
import Home from './Home.js';
var ChapTabs = require('./subject/chapter/ChapterView.js');

var Routes = React.createClass({
    render: function () {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="learn" component={ChapTabs} />
                    <Route path="login" component={Login} />
                </Route>
            </Router>
        );

    }
});

module.exports = Routes;
