import './ChapterView.css'

var React = require('react');

var Tab = require("react-bootstrap/lib/Tab");
var Col = require("react-bootstrap/lib/Col");
var Row = require("react-bootstrap/lib/Row");

import {Button, Glyphicon, Modal} from 'react-bootstrap';

var NavItem = require("react-bootstrap/lib/NavItem");
var Nav = require("react-bootstrap/lib/Nav");
var Accordion = require('../subchapter/Accordion.js');

import AddChaptersModal from './AddChaptersModal.js';
import Alert from 'react-s-alert';

import Client from '../../Client.js';

var Tabs = React.createClass({
	getInitialState: function () {
		return {
			chapters: [],
      		activeTab: 'chap0',
			showEditChaptersModal: false,
			showDeleteModal: false,
			openDeleteModalId: ""
		};
	},

	closeEditChaptersModal: function () {
        this.setState({ showEditChaptersModal: false });
    },

    openEditChaptersModal: function () {
        this.setState({ showEditChaptersModal: true });
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
		Client.deleteChapter(this.props.selectedCourse.subjectID, chapterID, () => {
			this.loadChaptersFromServer(this.props.selectedCourse.subjectID);
		});
	},

	handleSelect: function (tab){
		this.setState({
            activeTab: tab
    	});
	},

	loadChaptersFromServer: function (subjectID) {
		Client.getChaptersForSubject(subjectID, (chptrs) => {
			if (chptrs) {
				this.setState({ chapters: chptrs });
			}
		});
	},

	componentWillMount: function () {
		this.loadChaptersFromServer(this.props.selectedCourse.subjectID);
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.selectedCourse) {
			this.loadChaptersFromServer(nextProps.selectedCourse.subjectID);
		}
	},

	render: function () {
		if(this.state.chapters){
			var chaptersList = this.state.chapters.map(function (c, idx){
				return (<NavItem
							eventKey={'chap' + idx}
							onSelect={this.handleSelect}>
							{c.cname}
							<Button onClick={() => this.openDeleteModal(c.chapterID)}>
								<Glyphicon glyph="glyphicon glyphicon glyphicon-trash"/>
							</Button>
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
			                        <Button onClick={this.closeDeleteModal}>Abort</Button>
			                        <Button onClick={() => this.handleDeleteButton(c.chapterID)}>Delete chapter</Button>
			                    </Modal.Footer>
			                </Modal>
						</NavItem>);
			}, this);
			var tabPanes = this.state.chapters.map(function (c, idx){
				var theKey = 'chap' + idx;
			return (
			<Tab.Pane eventKey={theKey}>
				{this.state.activeTab === theKey ?
					<Accordion
						subject={this.props.selectedCourse}
						chapter={this.state.chapters[idx]}
						chapId={'chap' + idx}
						userID={this.props.userID}
						auth={this.props.auth}
						profile={this.props.profile}/>
				:null}
			</Tab.Pane>
			);
			}, this);
			}

		return (
			<div>
				<h2 className="ChapterTitle">{this.props.selectedCourse.name}</h2>

				<Tab.Container id="left-tabs-example" defaultActiveKey="chap0">
					<Row className="clearfix">
						<Col sm={3} className="animated chapterStack">
							<Button className="editChaptersButton" onClick={() => this.openEditChaptersModal()}>
								<Glyphicon glyph="glyphicon glyphicon glyphicon-list"/> Edit Chapters
							</Button>
							<Nav bsStyle="pills" stacked>
								{chaptersList}
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content animation>
								{tabPanes}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>

				<AddChaptersModal
					show={this.state.showEditChaptersModal}
					onHide={this.closeEditChaptersModal}/>
			</div>
		)
	}
});

module.exports = Tabs;
