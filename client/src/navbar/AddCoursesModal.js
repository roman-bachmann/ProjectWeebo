var React = require('react');
import {Modal, Button, ButtonToolbar} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import Client from '../Client.js';
import './AddCoursesModal.css';

var AddCoursesModal = React.createClass({
    getInitialState: function () {
        return {
            courseOptions: [],
            selectedCourses: []
        };
    },

    componentWillMount: function () {
        Client.getAllCourses((crs) => {
            this.setState({courseOptions: crs});
        });
    },

    handleTypeahead: function (crs) {
        this.setState({selectedCourses: crs});
    },

    handleSelectedCourses: function () {
        for (var i = 0; i < this.state.selectedCourses.length; i++) {
            var c = this.state.selectedCourses[i];
            Client.addCourseForUser(this.props.userID, 'student', c.subjectID);
        }
        this._typeahead.getInstance().clear()
        this.props.onCourseAdd(this.props.userID);
    },

    render: function () {
        return (
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Add courses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typeahead
                        onChange={this.handleTypeahead}
                        labelKey={option => `${option.subjectID} - ${option.name}`}
                        clearButton
                        multiple
                        maxResults='20'
                        options={this.state.courseOptions}
                        ref={ref => this._typeahead = ref}
                        placeholder="Choose a course..." />
                    <ButtonToolbar style={{marginTop: '10px'}}>
                        <Button className="addCoursesBtn" onClick={this.handleSelectedCourses}>
                            Add selected courses
                        </Button>
                    </ButtonToolbar>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="confirmBtn" onClick={this.props.onHide}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = AddCoursesModal;
