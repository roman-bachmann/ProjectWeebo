var React = require('react');
import {Modal, Button, ButtonToolbar, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import Alert from 'react-s-alert';
import Client from '../../Client.js';

var AddChaptersModal = React.createClass({
    getInitialState: function () {
        return {
            newChapterName: ""
        };
    },

    handleChapterForm: function (e) {
        this.setState({newChapterName: e.target.value});
    },

    handleSubmitChapter: function () {
        Client.insertChapter(this.props.subjectID, this.state.newChapterName,
            () => this.props.reloadChapters(this.props.subjectID)
        );
        this.setState({newChapterName: ""});
        Alert.success('Chapter successfully created!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
    },

    render: function () {

        return (
            <Modal {...this.props}
                   bsSize="large"
                   aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">
                        <Glyphicon glyph="glyphicon glyphicon glyphicon-list"/> Add Chapter
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="AddChapterForm">
                        <FormGroup controlId="chapterNameForm" >
                            <ControlLabel className="addChapterControllLabel">Add a new chapter to this course</ControlLabel>
                            <FormControl
                                  type="text"
                                  value={this.state.newChapterName}
                                  placeholder="Enter chapter name"
                                  onChange={this.handleChapterForm} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>

                    <Button className="submitChapter" onClick={this.handleSubmitChapter}>
                        <Glyphicon className="submitChapterGlyph" glyph="glyphicon glyphicon-ok"/> Add chapter
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
});

module.exports = AddChaptersModal;
