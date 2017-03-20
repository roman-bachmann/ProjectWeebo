import React from 'react';
import {Button, Glyphicon, Table} from 'react-bootstrap';
import Client from '../Client.js';
import './CourseList.css'

var CourseList = React.createClass({


    deleteCourseForUser: function (subjectID, userID) {
        Client.deleteSubjectForUser(subjectID, userID);
        this.props.onCourseAdd(this.props.userID);
    },

    render: function () {
        var courseItems = this.props.courses.map((c, idx) => (
            <tr>
                <th>{c.subjectID}</th>
                <th>{c.name}</th>
                <th>
                    <Button className="removeCourseButton" onClick={() => this.deleteCourseForUser(c.subjectID, this.props.userID)}>
                        <Glyphicon glyph="glyphicon glyphicon-remove"/>
                    </Button>
                </th>
            </tr>
        ));

        return (
            <div>
              <div className="EditCoursesTitle">Edit your subjects</div>
              <Table className="CourseTable">
                {courseItems}
              </Table>
            </div>
        )
    }

});


module.exports = CourseList;
