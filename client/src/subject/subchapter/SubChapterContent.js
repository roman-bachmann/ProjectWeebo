var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
import {Button, Dropdown, MenuItem, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
var VideoModal = require('./AddVideoModal.js');
var Banuser = require('./Banuser.js');
import Client from '../../Client.js';
import '../../fonts/fontawesome/css/font-awesome.css'

const tooltipRecommend = (
  <Tooltip id="tooltip-recommend"><strong>Recommend</strong> this video!</Tooltip>
);

const tooltipUnRecommend = (
  <Tooltip id="tooltip-unrecommend"><strong>Unrecommend</strong> this video!</Tooltip>
);
var ColorsClicked = { 	"Clicked": "#d1d2d3",
                    "Unclicked": "#fcfdff",
};

var SubChapterContent = React.createClass({
	getInitialState: function () {
		return {
			videos: [],
			showCourseModal: false,
			voteDict: {},
			showBanModal: false,
			videoColor: ColorsClicked.Clicked,
			discussColor: ColorsClicked.Unclicked,
			videoActive: this.props.needActive,
			comments: []
		};
	},

	loadVideosFromServer: function (subjectID, chapterID, subChapterID) {
		Client.getVideosForSubChapter(subjectID, chapterID, subChapterID, (vids) => {
			if (vids) {
				this.setState({ videos: vids });
			}
		});
    },
    loadCommentsFromServer: function(subjectID, chapterID, subChapterID) {
    	Client.getCommentsForSubChapter(subjectID, chapterID, subChapterID, (coms) => {
    		if (coms) {
    			this.setState({
    				comments: coms
    			});
    		}
    	});
    },

	componentWillMount: function (){
        this.loadVideosFromServer(
			this.props.subject.subjectID,
			this.props.chapter.chapterID,
			this.props.subchapter.subChapterID);
        this.loadCommentsFromServer(
        	this.props.subject.subjectID,
			this.props.chapter.chapterID,
			this.props.subchapter.subChapterID);

    },

    componentWillReceiveProps: function (nextProps) {
		if (nextProps.subject) {
			this.loadVideosFromServer(
				nextProps.subject.subjectID,
				nextProps.chapter.chapterID,
				nextProps.subchapter.subChapterID);
			this.loadCommentsFromServer(
        		nextProps.subject.subjectID,
				nextProps.chapter.chapterID,
				nextProps.subchapter.subChapterID);
		}
	},

    triggerReloadVideos: function () {
        console.log("Reloading videos");
        this.loadVideosFromServer(
			this.props.subject.subjectID,
			this.props.chapter.chapterID,
			this.props.subchapter.subChapterID)
    },

	handleModerateDropdown: function (eventKey, videoID) {
			if (eventKey === 'deleteVideoKey') {
				Client.deleteVideo(videoID, () => this.triggerReloadVideos());
			} else if (eventKey === 'banUserKey') {

			}
		},

	handleRecommendVideo: function(videoID) {
        Client.recommendVideo(this.props.subject.subjectID,
                              this.props.chapter.chapterID,
                              this.props.subchapter.subChapterID,
                              videoID,
                              () => this.triggerReloadVideos());
	},

	handleUnRecommendVideo: function(videoID) {
        Client.unRecommendVideo(this.props.subject.subjectID,
                              this.props.chapter.chapterID,
                              this.props.subchapter.subChapterID,
                              videoID,
                              () => this.triggerReloadVideos());
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
						userID={userID}
						subject={this.props.subject.subjectID}/>
					</Dropdown.Menu>
				</Dropdown>

			);
		} else {
			return null;
		}

	},

    recommendButton: function (videoID, Favorite) {
        if (this.props.auth.isAdmin() ||
            this.props.auth.isProfessor() ||
            this.props.auth.isStudass()) {

            if (Favorite === 1) {
                return (
                    <OverlayTrigger placement="top" overlay={tooltipUnRecommend}>
                        <Button className="btnStar_Recommended" onClick={() => this.handleUnRecommendVideo(videoID)}>
                            <Glyphicon glyph="glyphicon glyphicon-star"/>
                        </Button>
                    </OverlayTrigger>
                )
            } else {
                return (
                    <OverlayTrigger placement="top" overlay={tooltipRecommend}>
                        <Button  className="btnStar_Recommend" onClick={() => this.handleRecommendVideo(videoID)}>
                            <Glyphicon glyph="glyphicon glyphicon-star-empty"/>
                        </Button>
                    </OverlayTrigger>
                )
            }
        } else {
            return null;
        }
    },
    handleVideoPanel: function (){
    	if(this.state.videoColor != ColorsClicked.Clicked){
    		this.setState({
    			videoColor: ColorsClicked.Clicked,
    			discussColor: ColorsClicked.Unclicked,
    			videoActive: this.props.needActive
    		});
    	}
    },
    handleDiscussPanel: function (){
    	if(this.state.discussColor != ColorsClicked.Clicked){
    		this.setState({
    			discussColor: ColorsClicked.Clicked,
    			videoColor: ColorsClicked.Unclicked,
    			videoActive: null
    		});
    	}
    	console.log(this.state.comments);
    },
	render: function() {
		let closeCourseModal = () => this.setState({ showCourseModal: false });
        var videosList = null;
		if (this.state.videos) {
			videosList = this.state.videos.map( (v, idx) => (
				<div>
					{this.props.activePanel === this.state.videoActive ?
					<Row className="contentRow">
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
	                                    {this.recommendButton(v.videoID, v.Favorite)}
	                		</Col>
					</Row>
	              	<div>
	                    {v.Favorite === 1 ? <Row className="recommended">
	                      <Glyphicon glyph="glyphicon glyphicon-arrow-up"/> This video is recommended by a Professor! <Glyphicon glyph="glyphicon glyphicon-star-empty"/>
	                    </Row>
	                    :null}
	                  </div>
							</Col>
	            <div className="commentsWidget">
	              <div className="publishedInfo">Published by {v.fullName} on {v.addDate.substring(0,10)}</div>
	            <Row className="comment">
	              <i className="fa fa-quote-left"/> {v.Description} <i className="fa fa-quote-right"/>
	            </Row>

	            	</div>
	            </div>

					</Row>
					:null}
				</div>
			));
		}

		var discussList = null;
		if(this.state.comments){
			discussList = this.state.comments.map( (d, idx) => ( 
				<div>
					{this.state.discussColor === ColorsClicked.Clicked ?
					<Row className="contentRow">
						The users name: {d.fullName}, the comment: {d.comment}, the time: {d.commentTime}
					</Row>
					:null}
				</div>
			));
		}
		return (
			<div>
				<Grid bsClass="container" className="subGrid">
					<Row>
					<button className="videoPanelBtn" style={{backgroundColor: this.state.videoColor}}
					onClick={this.handleVideoPanel}><span><Glyphicon glyph="glyphicon glyphicon-play-circle"/>Videos</span></button>

					<button className="discussPanelBtn" style={{backgroundColor: this.state.discussColor}}
					onClick={this.handleDiscussPanel}><span><Glyphicon glyph="glyphicon glyphicon-comment"/>Discussion </span></button>

					<button className="shareBtn"
					onClick={()=>this.setState({ showCourseModal: true })}><span><Glyphicon glyph="glyphicon glyphicon-plus"/>  Add</span></button>
					</Row>
					{videosList}
					{discussList}
					
				</Grid>

				<VideoModal
					show={this.state.showCourseModal}
					onHide={closeCourseModal}
					subject={this.props.subject.subjectID}
					chapter={this.props.chapter.chapterID}
					subchapter={this.props.subchapter.subChapterID}
					userID={this.props.userID}
					bantime={this.props.bantime}
                    reloadOnSubmit={this.triggerReloadVideos} 
                    profile={this.props.profile}/>

			</div>
		);
	}

});

module.exports = SubChapterContent;
