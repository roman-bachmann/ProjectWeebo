import React from 'react';
import {Button, Glyphicon, Table, Modal} from 'react-bootstrap';
import Client from '../Client.js';

var CourseList = React.createClass({
    getInitialState: function () {
        return {
            showModal: false,
            openModal: ""
        }
    },

    closeModal: function () {
        this.setState({ showModal: false });
    },

    openModal: function (modalId) {
        this.setState({ showModal: true });
        this.setState({ openModalId: modalId });
    },

    handleDeleteButton: function (subjectID) {
        console.log("ljkdafjkladsfjkladfslkjadfsjklfads");
        this.props.deleteCourse(subjectID);
        this.closeModal();
    },

    render: function () {
        var courseItems = this.props.courses.map((c, idx) => (
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
                        <p>Are you sure that you want to delete the whole course <strong>{c.subjectID + " - " + c.name}</strong>?</p>
                        <p><strong>This action cannot be undone!</strong></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Abort</Button>
                        <Button onClick={() => this.handleDeleteButton(c.subjectID)}>Delete course</Button>
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
