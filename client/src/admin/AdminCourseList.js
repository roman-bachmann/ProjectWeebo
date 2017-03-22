import React from 'react';
import {Button, Glyphicon, Table, Modal} from 'react-bootstrap';
import Client from '../Client.js';

var CourseList = React.createClass({
    getInitialState: function () {
        return {
            allCourses: [],
            showModal: false,
            openModal: ""
        }
    },

    componentWillMount: function () {
        this.loadAllCourses();
    },

    loadAllCourses: function () {
        Client.getAllCourses((crs) => {
            this.setState({
                allCourses: crs
            });
        })
    },

    deleteCourse: function (subjectID) {
        Client.deleteCourse(subjectID);
        this.loadAllCourses();
    },

    closeModal: function () {
        this.setState({ showModal: false });
    },

    openModal: function (modalId) {
        this.setState({ showModal: true });
        this.setState({ openModalId: modalId });
    },

    render: function () {
        var courseItems = this.state.allCourses.map((c, idx) => (
            <tr>
                <th>{c.subjectID}</th>
                <th>{c.name}</th>
                <th>
                    <Button onClick={() => this.openModal(c.subjectID)}>
                        <Glyphicon glyph="glyphicon glyphicon-trash"/>
                    </Button>
                </th>
                <Modal show={this.state.showModal && this.state.openModalId === c.subjectID} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure that you want to delete the whole course {c.subjectID + " - " + c.name}?</p>
                        <p>This action cannot be undone!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Abort</Button>
                        <Button onClick={() => this.deleteCourse(c.subjectID)}>Delete course</Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        ));

        return (
            <div className="AdminCourseList">
                <Table responsive>
                    {courseItems}
                </Table>
            </div>
        )
    }

});


module.exports = CourseList;
