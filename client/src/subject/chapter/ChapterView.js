import './ChapterView.css'

var React = require('react');

var Tab = require("react-bootstrap/lib/Tab");
var Col = require("react-bootstrap/lib/Col");
var Row = require("react-bootstrap/lib/Row");

import {Button, Glyphicon, Modal} from 'react-bootstrap';

var NavItem = require("react-bootstrap/lib/NavItem");
var Nav = require("react-bootstrap/lib/Nav");
var Accordion = require('../subchapter/Accordion.js');

import EditChaptersModal from './EditChaptersModal.js';
import Alert from 'react-s-alert';

import Client from '../../Client.js';

var Tabs = React.createClass({
	getInitialState: function () {
		return {
			chapters: [],
      		activeTab: 'chap0',
			showEditChaptersModal: false
		};
	},

	closeEditChaptersModal: function () {
        this.setState({ showEditChaptersModal: false });
    },

    openEditChaptersModal: function () {
        this.setState({ showEditChaptersModal: true });
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
			var chaptersList = this.state.chapters.map(function (c, idx) {
				return (<NavItem eventKey={'chap' + idx}
								 onSelect={this.handleSelect}>
							{c.cname}
						</NavItem>);
			}, this);
			var tabPanes = this.state.chapters.map(function (c, idx) {
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
				<h2 className="ChapterTitle">{this.props.selectedCourse.subjectID} - {this.props.selectedCourse.name}</h2>

				<Tab.Container id="left-tabs-example" defaultActiveKey="chap0">
					<Row className="clearfix">
						<Col sm={3} className="animated chapterStack">
							<div className="editChapterTitle">
							<h3 className="ChapterHeading">
								Chapters
								{this.props.auth.canEditChapters() &&
									<span className="editChaptersButtonSep">
									<Button className="editChaptersButton" onClick={() => this.openEditChaptersModal()}>
										<Glyphicon glyph="glyphicon glyphicon-pencil"/> Edit
									</Button>
									</span>
								}
								</h3>
							</div>
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

				<EditChaptersModal
					show={this.state.showEditChaptersModal}
					onHide={this.closeEditChaptersModal}
					subjectID={this.props.selectedCourse.subjectID}
					reloadChapters={this.loadChaptersFromServer}
					chapters={this.state.chapters} />
			</div>
		)
	}
});

module.exports = Tabs;
