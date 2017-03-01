import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var Col = require("react-bootstrap/lib/Col");

var NavBar = require('./navbar/NavBar.js');
var ChapTabs = require('./subject/chapter/ChapterView.js');

import Client from './Client';

var App = React.createClass({
    getInitialState: function () {
        return {
            user: {},
            courses: [{}],
            selectedCourse: {}
        };
    },

    // Remove this after testing
    componentWillMount: function (){
        this.handleCourses('frodo');
        // <button type="button" onClick={() => this.handleCourses('frodo')}>Login test</button>
    },

    handleUserChange: function (userID) {
        // if user is new on site
        this.setState({ user: userID });
        // TODO: fetch user form db/facebook etc
        this.handleCourses(userID);
    },

    handleCourses: function (userID) {
        // TODO make content dependent on user in backend
        Client.getCoursesForUser(userID, (crs) => {
            this.setState({
                courses: crs
            });
        });
    },

    changeSelectedCourse: function (newSelectedCourse) {
        this.setState({selectedCourse: newSelectedCourse});
    },

    callFacebookLogin() {
        console.log("asdf");
        Client.loginFacebook();
    },

    render: function () {
        return (
            <div>
                <button onClick={this.callFacebookLogin}>Facebook AUTH</button>

                <NavBar
                    courses={this.state.courses}
                    onCourseChange={this.changeSelectedCourse} />
                <div className="App">
                    <ChapTabs
                        selectedCourse={this.state.selectedCourse}/>
                </div>

            </div>
        );
    }
});

module.exports = App;
