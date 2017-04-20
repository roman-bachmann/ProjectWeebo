var React = require('react');
import {Modal, Button, ButtonToolbar, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import Client from '../../Client.js';

var AddChaptersModal = React.createClass({
    getInitialState: function () {
        return {
            newChapterName: ""
        };
    },

    handleChapterAdd: function () {

    },

    handleSubmitChapter: function () {

    },

    render: function () {

        return (
            <Modal {...this.props}
                   bsSize="large"
                   aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm"><Glyphicon glyph="glyphicon glyphicon glyphicon-list"/> Edit Chapters</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form className="AddChapterForm">
                        <FormGroup controlId="chapterNameForm" >
                            <ControlLabel className="addChapterControllLabel">Add a new chapter to this course</ControlLabel>
                            <FormControl
                                  type="text"
                                  value={this.state.newChapterName}
                                  placeholder="Enter chapter name"
                                  onChange={this.handleChapterAdd} />
                            <FormControl.Feedback />
                        </FormGroup>

                        <Button className="submitChapter" onClick={this.handleSubmitChapter}>
                            <Glyphicon className="submitChapterGlyph" glyph="glyphicon glyphicon-ok"/> Add chapter
                        </Button>
                    </form>

                    <Modal.Footer>
                        <Button className="closeChaptersModalButton" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button className="saveChapterChangesButton" onClick={this.props.onHide} bsStyle="primary">
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        );
    }
});

module.exports = AddChaptersModal;
