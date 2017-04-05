import React from 'react';
import {Button, Glyphicon, Table, Modal} from 'react-bootstrap';
import Client from '../Client.js';
import Alert from 'react-s-alert';
import './CourseList.css';

var CourseList = React.createClass({
    getInitialState: function () {
        return {
            showModal: false,
            openModalId: ""
        }
    },

    closeModal: function () {
        this.setState({ showModal: false });
    },

    openModal: function (modalId) {
        this.setState({ showModal: true });
        this.setState({ openModalId: modalId });
    },

    handleRemoveButton: function (subjectID, userID) {
        Client.deleteSubjectForUser(subjectID, userID);
        this.props.onCourseAdd(userID);
        this.closeModal();
        Alert.success('Course successfully removed!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
    },

    render: function () {
        var courseItems = this.props.courses.map((c, idx) => (
            <tr>
                <th>{c.subjectID}</th>
                <th>{c.name}</th>
                <th>
                    <Button className="removeCourseButton" onClick={() => this.openModal(c.subjectID)}>
                        <Glyphicon className="CourseRemove" glyph="glyphicon glyphicon-remove"/>
                    </Button>
                </th>
                <Modal show={this.state.showModal && this.state.openModalId === c.subjectID} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><Glyphicon glyph="glyphicon glyphicon-remove"/> Remove course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure that you want to remove the course <strong>{c.subjectID + " - " + c.name}</strong> from your courses?</p>
                        <p>Courses can be added again via  <span className="noCourses"><Glyphicon glyph="glyphicon glyphicon-education"/> Courses <Glyphicon glyph="glyphicon glyphicon-arrow-right"/> <Glyphicon glyph="glyphicon glyphicon-pencil"/> Add courses </span></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Abort</Button>
                        <Button onClick={() => this.handleRemoveButton(c.subjectID, this.props.userID)}>Remove course</Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        ));

        return (
            <div>
              <div className="EditCoursesTitle">My courses</div>
              <Table className="CourseTable">
                {courseItems}
              </Table>
            </div>
        )
    }

});


module.exports = CourseList;
