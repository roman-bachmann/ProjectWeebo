var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
import {Button, Dropdown, MenuItem, Glyphicon} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
var VideoModal = require('./AddVideoModal.js');
import Client from '../../Client.js';

var SubChapterContent = React.createClass({
	getInitialState: function () {
		return {
			videos: [],
			showCourseModal: false,
			voteDict: {}
		};
	},

	loadVideosFromServer: function (subjectID, chapterID, subChapterID) {
		Client.getVideosForSubChapter(subjectID, chapterID, subChapterID, (vids) => {
			if (vids) {
				this.setState({ videos: vids });
			}
		});
    },

	componentWillMount: function (){
        this.loadVideosFromServer(
			this.props.subject.subjectID,
			this.props.chapter.chapterID,
			this.props.subchapter.subChapterID)
    },

    componentWillReceiveProps: function (nextProps) {
		if (nextProps.subject) {
			this.loadVideosFromServer(
				nextProps.subject.subjectID,
				nextProps.chapter.chapterID,
				nextProps.subchapter.subChapterID);
		}
	},

	handleModerateDropdown: function (eventKey, videoID) {
			if (eventKey == 'reccommendKey') {
				this.handleRecommendVideo(videoID);
			} else if (eventKey == 'deleteVideoKey') {
				Client.deleteVideo(videoID);
			} else if (eventKey == 'banUserKey') {

			}
		},

		moderateButton: function (videoID) {
			if (this.props.auth.isAdmin() ||
				this.props.auth.isProfessor() ||
				this.props.auth.isStudass()) {
				return (
					<Dropdown id={"moderateButtonDropdown-" + videoID}
							  onSelect={(evt) => this.handleModerateDropdown(evt, videoID)}>
						<Dropdown.Toggle>
							<Glyphicon glyph="glyphicon glyphicon-cog"/> Moderate
					    </Dropdown.Toggle>
						<Dropdown.Menu className="super-colors">
							<MenuItem eventKey="recommendKey">
								<Glyphicon glyph="glyphicon glyphicon-star"/> Recommend Video
							</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey="deleteVideoKey">
								<Glyphicon glyph="glyphicon glyphicon-trash"/> Delete Video
							</MenuItem>
							<MenuItem eventKey="banUserKey">
								<Glyphicon glyph="glyphicon glyphicon-remove-sign"/> Ban User
							</MenuItem>
						</Dropdown.Menu>
					</Dropdown>
				);
			} else {
				return null;
			}

		},

	render: function() {

		let closeCourseModal = () => this.setState({ showCourseModal: false });
		let reloadVids = () => this.loadVideosFromServer(this.props.subject.subjectID, this.props.chapter.chapterID, this.props.subchapter.subChapterID);

		if (this.state.videos) {
			var videosList = this.state.videos.map( (v, idx) => (
				<Row className="contentRow">
				{this.props.activePanel === this.props.needActive ?
					<div>
						<Col md={7} className="videoAndTools">
							<Row>
								<YouTube id={v.videoID} />
							</Row>
							<Row>
								<Col md={8}>
									<Upvote videoid={v.subChapterVideoID} userID={this.props.userID} />
								</Col>
								<Col md={4}>
									{this.moderateButton(v.videoID)}
									<Button bsStyle="danger"><Glyphicon glyph="glyphicon glyphicon-heart"/></Button>
								</Col>

							</Row>
						</Col>
						<Col md={3} className="commentAndRecommended">
							{v.Favorite === 1 ? <Row className="recommended">
								<Glyphicon glyph="glyphicon glyphicon-arrow-left"/>  Recommended by a Professor! <Glyphicon glyph="glyphicon glyphicon-star-empty"/>
							</Row>
							:null}
							<Row className="comment">
								{v.Description}
							</Row>
						</Col>
					</div>
				:null}
				</Row>
			));
		} else {
			var videosList = null;
		}

		return (
			<div>
				<Grid bsClass="container" className="subGrid">
					<button className="shareBtn"
					onClick={()=>this.setState({ showCourseModal: true })}><span><Glyphicon glyph="glyphicon glyphicon-plus"/>  Add</span></button>
					{videosList}
				</Grid>

				<VideoModal
					show={this.state.showCourseModal}
					onHide={closeCourseModal}
					subject={this.props.subject.subjectID}
					chapter={this.props.chapter.chapterID}
					subchapter={this.props.subchapter.subChapterID}
					userID={this.props.userID}
					reVid={reloadVids}/>


			</div>
		);
	}

});

module.exports = SubChapterContent;
