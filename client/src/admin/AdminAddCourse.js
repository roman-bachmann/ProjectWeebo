import React from 'react'
import Client from '../Client.js'
import {Button} from 'react-bootstrap';

var AdminAddCourse = React.createClass({
    getInitialState: function () {
        return {
            newCourseID: "",
            newCourseName: ""
        };
    },

    handleCourseID: function (e) {
        this.setState({newCourseID: e});
    },

    handleCourseName: function (e) {
        this.setState({newCourseName: e});
    },

    handleSubmitCourse: function () {
        Client.insertCourse(this.state.newCourseID, this.state.newCourseName);
        console.log(this.state.newCourseID)
    },

    render: function () {
        return (
            <div className="AdminAddCourse">
                <p>Course ID <input type="text" onChange={this.handleCourseID}/></p>
                <p>Course name <input type="text" onChange={this.handleCourseName}/></p>
                <Button onClick={this.handleSubmitCourse}>Submit</Button>
            </div>
        )
    }
});

module.exports = AdminAddCourse;
