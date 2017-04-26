import './EditChaptersModal.css'

var React = require('react');
import {Modal, Button, ButtonToolbar, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock, Table} from 'react-bootstrap';
import Alert from 'react-s-alert';
import Client from '../../Client.js';

var EditChaptersModal = React.createClass({
    getInitialState: function () {
        return {
            newChapterName: "",
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

    handleDeleteButton: function (chapterID) {
		this.deleteChapter(chapterID);
        this.closeDeleteModal();
        Alert.success('Chapter successfully deleted!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
	},

	deleteChapter: function (chapterID) {
		Client.deleteChapter(this.props.subjectID, chapterID,
			() => this.props.reloadChapters(this.props.subjectID)
		);
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

    handleKeyPress: function (target) {
        if(target.charCode==13){
            this.handleSubmitChapter();
        }
    },

    render: function () {

        var chaptersList = this.props.chapters.map(function (c, idx) {
            return (
                <tr key={'editChaptersModalEntry' + idx}>
                    <th>{c.cname}</th>
                    <th>
                        <Button style={{color: 'red'}}
                                onClick={() => this.openDeleteModal(c.chapterID)}
                                className={'editChaptersDeleteModalButton' + idx} >
                            <Glyphicon glyph="glyphicon glyphicon glyphicon-trash"/>
                        </Button>
                    </th>
                    <Modal show={this.state.showDeleteModal && this.state.openDeleteModalId === c.chapterID}
                           onHide={this.closeDeleteModal} >
                        <Modal.Header closeButton>
                            <Modal.Title><Glyphicon glyph="glyphicon glyphicon-trash"/> Delete chapter</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure that you want to delete the whole chapter <strong>{c.cname}</strong>?</p>
                            <p><strong>This action cannot be undone!</strong></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeDeleteModal} className={'abortButton' + idx}>
                                Abort
                            </Button>
                            <Button onClick={() => this.handleDeleteButton(c.chapterID)} className={'deleteButton' + idx}>
                                Delete chapter
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </tr>
            );
        }, this);

        return (
            <Modal show={this.props.show}
                   onHide={this.props.onHide}
                   bsSize="large"
                   aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">
                        <Glyphicon glyph="glyphicon glyphicon-pencil"/> Edit Chapters
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalbody">
                    <Table responsive>
                        <tbody>{chaptersList}</tbody>
                    </Table>
                    <div className="submitDiv">
                        <form className="AddChapterForm" onSubmit={event => event.preventDefault()} >
                            <FormGroup controlId="chapterNameForm" >
                                <ControlLabel className="addChapterControllLabel">Add a new chapter to this course</ControlLabel>
                                <FormControl
                                      type="text"
                                      value={this.state.newChapterName}
                                      placeholder="Enter chapter name"
                                      onChange={this.handleChapterForm}
                                      onKeyPress={this.handleKeyPress}
                                      className="addChapterInputField" />
                                <FormControl.Feedback />
                            </FormGroup>
                        </form>

                        <Button className="submitChapter" onClick={this.handleSubmitChapter}>
                            <Glyphicon className="submitChapterGlyph" glyph="glyphicon glyphicon-ok"/> Add chapter
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
});

module.exports = EditChaptersModal;
