import React, { Component } from 'react';
import { PropTypes as T } from 'react';
import logo from './logo.svg';
import './App.css';
var Col = require("react-bootstrap/lib/Col");

var NavBar = require('./navbar/NavBar.js');
var ChapTabs = require('./subject/chapter/ChapterView.js');
var Login = require('./auth/Login.js');

import Client from './Client';
import AuthService from './auth/AuthService.js'
import {Router, Route, browserHistory, IndexRoute} from 'react-router';


export class App extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            userID: {},
            courses: [{}],
            selectedCourse: {}
        }

        this.changeSelectedCourse = this.changeSelectedCourse.bind(this)

        // Listen to profile_updated events to update internal state
        props.route.auth.on('profile_updated', (newProfile) => {
            this.handleUserChange(newProfile.user_id);
        })
    }

    componentWillMount() {
        var auth = this.props.route.auth;
        if (auth.getProfile()) {
            this.handleUserChange(auth.getProfile().user_id);
        }
    }

    handleUserChange(userID) {
        this.setState({ userID: userID });
        this.handleCourses(userID);
    }

    handleCourses(userID) {
        Client.getCoursesForUser(userID, (crs) => {
            this.setState({
                courses: crs
            });
        });
    }

    changeSelectedCourse(newSelectedCourse) {
        this.setState({
            selectedCourse: newSelectedCourse
        });
    }

    render () {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                selectedCourse: this.state.selectedCourse,
                auth: this.props.route.auth,
                userID: this.state.userID
            })
        );

        return (
            <div>
                <NavBar
                    courses={this.state.courses}
                    onCourseChange={this.changeSelectedCourse}
                    auth={this.props.route.auth}
                    userID={this.state.userID}/>

                <div className="App">
                    {childrenWithProps}
                </div>

            </div>
        );
    }
}

export default App;
