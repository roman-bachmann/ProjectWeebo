var React = require('react');
import {Modal, Button, ButtonToolbar, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock, Table} from 'react-bootstrap';
import Alert from 'react-s-alert';
import Client from '../../Client.js';

var EditSubChaptersModal = React.createClass({
    getInitialState: function () {
        return {
            newSubChapterName: "",
            showDeleteModal: false,
			openDeleteModalId: ""
        };
    },

    openDeleteModal: function (modalId) {
		this.setState({ showDeleteModal: true });
        this.setState({ openDeleteModalId: modalId });
	},

	closeDeleteModal: function () {
		this.setState({ showDeleteModal: false });
	},

    handleDeleteButton: function (subChapterID) {
		this.deleteSubChapter(subChapterID);
        this.closeDeleteModal();
        Alert.success('Chapter successfully deleted!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
	},

	deleteSubChapter: function (subChapterID) {
		Client.deleteSubChapter(this.props.subjectID, this.props.chapterID, subChapterID,
			() => this.props.reloadSubChapters(this.props.subjectID, this.props.chapterID)
		);
	},

    handleSubChapterForm: function (e) {
        this.setState({newSubChapterName: e.target.value});
    },

    handleSubmitSubChapter: function () {
        Client.insertSubChapter(this.props.subjectID, this.props.chapterID, this.state.newSubChapterName,
            () => this.props.reloadSubChapters(this.props.subjectID, this.props.chapterID)
        );
        this.setState({newSubChapterName: ""});
        Alert.success('Subchapter successfully created!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
    },

    handleKeyPress: function (target) {
        if(target.charCode==13){
            this.handleSubmitSubChapter();
        }
    },

    render: function () {
        var subChaptersList = this.props.subchapters.map(function (sc, idx) {
            return (
                <tr>
                    <th>{sc.sname}</th>
                    <th>
                        <Button onClick={() => this.openDeleteModal(sc.subChapterID)}>
                            <Glyphicon glyph="glyphicon glyphicon glyphicon-trash"/>
                        </Button>
                    </th>
                    <Modal show={this.state.showDeleteModal && this.state.openDeleteModalId === sc.subChapterID}
                           onHide={this.closeDeleteModal} >
                        <Modal.Header closeButton>
                            <Modal.Title><Glyphicon glyph="glyphicon glyphicon-trash"/> Delete subchapter</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure that you want to delete the whole subchapter <strong>{sc.sname}</strong>?</p>
                            <p><strong>This action cannot be undone!</strong></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeDeleteModal}>Abort</Button>
                            <Button onClick={() => this.handleDeleteButton(sc.subChapterID)}>Delete subchapter</Button>
                        </Modal.Footer>
                    </Modal>
                </tr>
            );
        }, this);

        return (
            <Modal {...this.props}
                   bsSize="large"
                   aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">
                        <Glyphicon glyph="glyphicon glyphicon-pencil"/> Edit Subchapters
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive>
                        {subChaptersList}
                    </Table>
                    <form className="AddSubChapterForm" onSubmit={event => event.preventDefault()}>
                        <FormGroup controlId="subChapterNameForm" >
                            <ControlLabel className="addSubChapterControllLabel">Add a new subchapter to this chapter</ControlLabel>
                            <FormControl
                                  type="text"
                                  value={this.state.newSubChapterName}
                                  placeholder="Enter subchapter name"
                                  onChange={this.handleSubChapterForm}
                                  onKeyPress={this.handleKeyPress} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </form>

                    <Button className="submitSubChapter" onClick={this.handleSubmitSubChapter}>
                        <Glyphicon className="submitSubChapterGlyph" glyph="glyphicon glyphicon-ok"/> Add subchapter
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
});

module.exports = EditSubChaptersModal;
