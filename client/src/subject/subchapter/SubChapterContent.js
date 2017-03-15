var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';
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

	render: function() {
		var moderateButton = (
			<DropdownButton bsStyle="info" title="⚙ Moderate" id="moderateButtonDropdown">
      			<MenuItem eventKey="recommendKey">Recommend Video</MenuItem>
				<MenuItem divider />
      			<MenuItem eventKey="deleteVideoKey">Delete Video</MenuItem>
      			<MenuItem eventKey="banUserKey">Ban User</MenuItem>
    		</DropdownButton>
		);

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
									{moderateButton}
									<Button bsStyle="danger">♥</Button>
								</Col>

							</Row>
						</Col>
						<Col md={3} className="commentAndRecommended">
							{v.Favorite === 1 ? <Row className="recommended">
								Instructor recommends!
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
					onClick={()=>this.setState({ showCourseModal: true })}><span>Add</span></button>
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
