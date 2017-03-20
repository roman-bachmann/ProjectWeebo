var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
import {Button, Dropdown, MenuItem, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
var VideoModal = require('./AddVideoModal.js');
var Banuser = require('./Banuser.js');
import Client from '../../Client.js';

const tooltipRecommend = (
  <Tooltip id="tooltip-recommend"><strong>Recommend</strong> this video!</Tooltip>
);

const tooltipUnRecommend = (
  <Tooltip id="tooltip-unrecommend"><strong>Unrecommend</strong> this video!</Tooltip>
);

var SubChapterContent = React.createClass({
	getInitialState: function () {
		return {
			videos: [],
			showCourseModal: false,
			voteDict: {},
			showBanModal: false
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
			if (eventKey === 'deleteVideoKey') {
				Client.deleteVideo(videoID);
			} else if (eventKey === 'banUserKey') {

			}
		},

	handleRecommendVideo: function(videoID) {

	},

	handleUnRecommendVideo: function(videoID) {

	},

		moderateButton: function (videoID, userID) {
			let closeBanModal = () => this.setState({showBanModal: false});
			if (this.props.auth.isAdmin() ||
				this.props.auth.isProfessor() ||
				this.props.auth.isStudass()) {
				return (
					<Dropdown id={"moderateButtonDropdown-" + videoID}
							  onSelect={(evt) => this.handleModerateDropdown(evt, videoID)}>
						<Dropdown.Toggle className="ModerateButton">
							<Glyphicon glyph="glyphicon glyphicon-cog"/> Moderate
					    </Dropdown.Toggle>
						<Dropdown.Menu className="super-colors">
							<MenuItem eventKey="deleteVideoKey">
								<Glyphicon glyph="glyphicon glyphicon-trash"/> Delete Video
							</MenuItem>
							<MenuItem onSelect={()=>this.setState({ showBanModal: true })} eventKey="banUserKey">
								<Glyphicon glyph="glyphicon glyphicon-remove-sign"/> Ban User
							</MenuItem>
							<Banuser
							show={this.state.showBanModal}
							onHide={closeBanModal}
							userID={userID}/>
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
        var videosList = null;
		if (this.state.videos) {
			videosList = this.state.videos.map( (v, idx) => (
				<Row className="contentRow">
				{this.props.activePanel === this.props.needActive ?
					<div>
						<Col md={7} className="videoAndTools">
							<Row>
								<YouTube id={v.videoID} />
							</Row>
							<Row>
								<Col md={8}>
									<Upvote videoid={v.subChapterVideoID} userID={this.props.userID}/>
								</Col>
								<Col md={4}>
									{this.moderateButton(v.videoID, v.userID)}
									{v.Favorite === 1 ?
										<OverlayTrigger placement="top" overlay={tooltipUnRecommend}>
											<Button className="btnStar_Recommended" onClick={this.handleUnRecommendVideo(v.videoID)}>
												<Glyphicon glyph="glyphicon glyphicon-star"/>
											</Button>
										</OverlayTrigger>
										:
										<OverlayTrigger placement="top" overlay={tooltipRecommend}>
											<Button  className="btnStar_Recommend" onClick={this.handleRecommendVideo(v.videoID)}>
												<Glyphicon glyph="glyphicon glyphicon-star-empty"/>
											</Button>
										</OverlayTrigger>
									}
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
		}
		return (
			<div>
				<Grid bsClass="container" className="subGrid">
					<Row>
					<button className="shareBtn"
					onClick={()=>this.setState({ showCourseModal: true })}><span><Glyphicon glyph="glyphicon glyphicon-plus"/>  Add</span></button>
					</Row>
					{videosList}
				</Grid>

				<VideoModal
					show={this.state.showCourseModal}
					onHide={closeCourseModal}
					subject={this.props.subject.subjectID}
					chapter={this.props.chapter.chapterID}
					subchapter={this.props.subchapter.subChapterID}
					userID={this.props.userID}
					reVid={reloadVids}
					bantime={this.props.bantime}/>
				
			</div>
		);
	}

});

module.exports = SubChapterContent;
