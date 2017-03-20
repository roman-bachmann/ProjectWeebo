import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import Client from '../Client.js';
import './CourseList.css'

var CourseList = React.createClass({


    deleteCourseForUser: function (subjectID, userID) {
        Client.deleteSubjectForUser(subjectID, userID);
        this.props.onCourseAdd(this.props.userID);
    },

    render: function () {
        var courseItems = this.props.courses.map((c, idx) => (
              <div>
                {c.subjectID + " - " + c.name + "  "}
                <Button className="removeCourseButton" onClick={() => this.deleteCourseForUser(c.subjectID, this.props.userID)}>
                    <Glyphicon glyph="glyphicon glyphicon-remove"/>
                </Button>
            </div>
        ));

        return (
            <div>
              <div className="EditCoursesTitle">Edit your subjects</div>
                {courseItems}
            </div>
        )
    }

});


module.exports = CourseList;
