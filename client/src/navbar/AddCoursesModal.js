var React = require('react');
import {Modal, Button} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import Client from '../Client.js';

var AddCoursesModal = React.createClass({
    getInitialState: function () {
        return {
            multiple: true,
            courseOptions: [
                {courseID: 'TDT1111', courseName: 'Course1'},
                {courseID: 'TDT2222', courseName: 'Course2'},
                {courseID: 'TDT3333', courseName: 'Course3'},
            ]
        };
    },

    handleAddCourses: function () {

    },

    render: function () {
        return (
            <Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Add courses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typeahead
                        labelKey={option => `${option.courseID} - ${option.courseName}`}
                        multiple={this.state.multiple}
                        options={this.state.courseOptions}
                        placeholder="Choose a course..." />
                    <Button className="addCoursesBtn" onClick={this.handleAddCourses}>Add course(s)</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="confirmBtn" onClick={this.props.onHide}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = AddCoursesModal;
