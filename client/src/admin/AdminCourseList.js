import React from 'react';
import {Button, Glyphicon, Table, Modal} from 'react-bootstrap';
import Alert from 'react-s-alert';

/**
 * Component where admins can get a list of all courses in the database and
 * if needed delete them.
 */
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

    handleDeleteButton: function (subjectID) {
        this.props.deleteCourse(subjectID);
        this.closeModal();
        Alert.success('Course successfully deleted!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
    },

    render: function () {
        var courseItems = this.props.courses.map((c, idx) => (
            <tr key={'adminCourseItem' + idx}>
                <th>{c.subjectID}</th>
                <th>{c.name}</th>
                <th>
                    <Button className="removeCourseButton" onClick={() => this.openModal(c.subjectID)}>
                        <Glyphicon  className="CourseRemove" glyph="glyphicon glyphicon-trash"/>
                    </Button>
                </th>
                <Modal show={this.state.showModal && this.state.openModalId === c.subjectID} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><Glyphicon glyph="glyphicon glyphicon-trash"/> Delete course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure that you want to delete the whole course <strong>{c.subjectID + " - " + c.name}</strong>?</p>
                        <p><strong>This action cannot be undone!</strong></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modalAbortButton" onClick={this.closeModal}>Abort</Button>
                        <Button className="modalDeleteCourseButton" onClick={() => this.handleDeleteButton(c.subjectID)}>Delete course</Button>
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
