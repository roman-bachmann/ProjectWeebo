var React = require('react');
import {Modal, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';
import Client from '../../Client.js';

var EditSubChaptersModal = React.createClass({
    getInitialState: function () {
        return {

        };
    },

    componentWillMount: function () {

    },

    render: function () {
        return (
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm"><Glyphicon glyph="glyphicon glyphicon glyphicon-list-alt"/> Edit Subchapters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Test</p>
                    <ButtonToolbar style={{marginTop: '10px'}}>
                        <Button className="addCoursesBtn" onClick={this.handleSelectedCourses}>
                            Add selected course(s)
                        </Button>
                    </ButtonToolbar>
                </Modal.Body>
            </Modal>
        );
    }
});

module.exports = EditSubChaptersModal;
