import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var Col = require("react-bootstrap/lib/Col");

var NavBar = require('./navbar/NavBar.js');
var ChapTabs = require('./subject/chapter/ChapterView.js');

import Client from './Client';

class App extends Component {
    state = {
        user: 0,
        courses: []
    };

    handleUserChange(userID) {
        // if user is new on site
        this.setState({ user: userID });
        // TODO: fetch user form db/facebook etc
        this.handleCourses(userID);
    };

    handleCourses(userID) {
        // TODO make content dependent on user in backend
        Client.getCoursesForUser(userID, (crs) => {
            this.setState({
                courses: crs
            });
        });
    };
    
    render() {
        const { courses } = this.state;
        const courseEntries = courses.map((c, idx) => (
            <tr key={idx}>
                <td>{c.subjectID}</td>
                <td>{c.name}</td>
                <td>{c.classYear}</td>
            </tr>
        ));
        
        return (
            <div>
            
                
                <button type="button" onClick={() => this.handleCourses(1000)}>BUTTON!!!</button>
                    
                <table>
                    {courseEntries}
                </table>
                    
                <NavBar />
                <div className="App">
                    <ChapTabs />
                </div>    

            </div>
        );
    }
}

export default App;