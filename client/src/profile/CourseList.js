import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import Client from '../Client.js';

var CourseList = React.createClass({


    deleteCourseForUser: function (subjectID, userID) {
        Client.deleteSubjectForUser(subjectID, userID);
        this.props.onCourseAdd(this.props.userID);
    },

    render: function () {
        var courseItems = this.props.courses.map((c, idx) => (
            <div>
                {c.subjectID + " - " + c.name}
                <Button onClick={() => this.deleteCourseForUser(c.subjectID, this.props.userID)}>
                    <Glyphicon glyph="glyphicon glyphicon-trash"/>
                </Button>
            </div>
        ));

        return (
            <div>
                {courseItems}
            </div>
        )
    }

});


module.exports = CourseList;
