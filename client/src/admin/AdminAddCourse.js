import React from 'react'
import Client from '../Client.js'
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

var AdminAddCourse = React.createClass({
    getInitialState: function () {
        return {
            newCourseID: "",
            newCourseName: ""
        };
    },

    handleCourseID: function (e) {
        this.setState({newCourseID: e.target.value});
    },

    getCourseIDValidationState: function () {
        const length = this.state.newCourseID.length;
        if (length > 0 && length <= 8) return 'success';
        else if (length > 8) return 'error';
    },

    handleCourseName: function (e) {
        this.setState({newCourseName: e.target.value});
    },

    getCourseNameValidationState: function () {
        const length = this.state.newCourseName.length;
        if (length > 0 && length <= 256) return 'success';
        else if (length > 256) return 'error';
    },

    handleSubmitCourse: function () {
        Client.insertCourse(this.state.newCourseID, this.state.newCourseName,
                            () => this.props.reloadAllCourses());
        this.setState({newCourseID: "",
                       newCourseName: ""});
    },



    render: function () {
        return (
            <form className="AdminAddCourseForm">
                <FormGroup controlId="courseIdForm"
                           validationState={this.getCourseIDValidationState()} >
                    <ControlLabel className="addCourseControllLabel">Course ID</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.newCourseID}
                        placeholder="Enter course ID"
                        onChange={this.handleCourseID} />
                    <FormControl.Feedback />
                    <HelpBlock>CourseID length must be shorter than 8 characters.</HelpBlock>
                </FormGroup>

                <FormGroup controlId="courseNameForm"
                           validationState={this.getCourseNameValidationState()} >
                    <ControlLabel  className="addCourseControllLabel">Course name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.newCourseName}
                        placeholder="Enter course name"
                        onChange={this.handleCourseName} />
                    <FormControl.Feedback />
                </FormGroup>

                <Button className="submitCourse" onClick={this.handleSubmitCourse}>Submit</Button>
            </form>
        )
    }
});

module.exports = AdminAddCourse;
