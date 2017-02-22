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
            courses: [ { subjectID: 'emptyID', name: 'emptyName', classYear: 'emptyYear' } ],
            selectedCourse: { subjectID: 'emptyID', name: 'emptyName', classYear: 'emptyYear' }
        };
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
        console.log('changeSelectedCourse');
        console.log(newSelectedCourse);
        this.setState({selectedCourse: newSelectedCourse});
        console.log(this.state.selectedCourse);
    },
    
    render: function () {
        var courseEntries = this.state.courses.map((c, idx) => (
            <tr key={idx}>
                <td>{c.subjectID}</td>
                <td>{c.name}</td>
                <td>{c.classYear}</td>
            </tr>
        ));
        
        return (
            <div>
                <p>Selected course: {this.state.selectedCourse.subjectID} - {this.state.selectedCourse.name}</p>
                <button type="button" onClick={() => this.handleCourses('frodo')}>Login as frodo</button>
                    
                <table>
                    {courseEntries}
                </table>
                    
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