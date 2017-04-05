import React from 'react'
import Client from '../Client.js'
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon} from 'react-bootstrap';
import Alert from 'react-s-alert';

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
        Alert.success('Course successfully created!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
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
                    <HelpBlock>CourseID can be at most 8 characters long.</HelpBlock>
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

                <Button className="submitCourse" onClick={this.handleSubmitCourse}>  <Glyphicon  className="submitCourseGlyph" glyph="glyphicon glyphicon-ok"/></Button>
            </form>
        )
    }
});

module.exports = AdminAddCourse;
