/* 	Written by Roman Bachmann, Sølve Bø Hunvik and Thay Tharma
	This component is for loading the website with videos and discuss section
	Also contains logic for ban users, delete videos and favorite videos
*/

var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
import {Button, Dropdown, MenuItem, Glyphicon, OverlayTrigger, Tooltip, Modal, FormGroup, ControlLabel, FormControl, Overlay, Popover} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
var VideoModal = require('./AddVideoModal.js');
var Banuser = require('./Banuser.js');
import Alert from 'react-s-alert';
import Client from '../../Client.js';
import '../../fonts/fontawesome/css/font-awesome.css'
import commentsIcon from '../../img/commentsIcon.png'

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
			comments: [],
            showDeleteModal: false,
            openDeleteModalId: "",
            comment: '',
            show: false
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
	//The trigger functions runs after deleting a video or sharing a video
    triggerReloadVideos: function () {
        console.log("Reloading videos");
        this.loadVideosFromServer(
			this.props.subject.subjectID,
			this.props.chapter.chapterID,
			this.props.subchapter.subChapterID)
    },
    triggerReloadComments: function () {
    	console.log("Reloading comments");
    	this.loadCommentsFromServer(
    		this.props.subject.subjectID,
    		this.props.chapter.chapterID,
    		this.props.subchapter.subChapterID)
    },
    //this function triggers the ban user modal
	handleModerateDropdown: function (eventKey, videoID) {
		if (eventKey === 'deleteVideoKey') {
            this.openDeleteModal(videoID);
		} else if (eventKey === 'banUserKey') {
            // Handled in modal
		}
	},
	//Functions for deleting videos
    closeDeleteModal: function () {
        this.setState({ showDeleteModal: false });
    },

    openDeleteModal: function (modalId) {
        this.setState({ showDeleteModal: true });
        this.setState({ openDeleteModalId: modalId });
    },
    handleDeleteVideoButton: function (videoID) {
        Client.deleteVideo(videoID, () => this.triggerReloadVideos());
        Alert.success('Video successfully deleted!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 4000,
            offset: 50
        });
        this.closeModal();
    },
    //Functions for the star button that makes a video recommended by professor
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
	//Moderate button for admins/professors/studass to delete videos or ban users
	moderateButton: function (videoID, userID) {
		let closeBanModal = () => this.setState({showBanModal: false});
		if (this.props.auth.isAdmin() ||
			this.props.auth.isProfessor() ||
			this.props.auth.isStudass()) {
			return (
				<Dropdown id={"moderateButtonDropdown-" + videoID}
						  onSelect={(evt) => this.handleModerateDropdown(evt, videoID)}
                          dropup >
					<Dropdown.Toggle className="ModerateButton">
						<Glyphicon glyph="glyphicon glyphicon-cog"/> Moderate
				    </Dropdown.Toggle>
					<Dropdown.Menu className="super-colors">
						<MenuItem eventKey="deleteVideoKey">
							<Glyphicon glyph="glyphicon glyphicon-trash"/> Delete Video
                            <Modal show={this.state.showDeleteModal && this.state.openDeleteModalId === videoID} onHide={this.closeDeleteModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title><Glyphicon glyph="glyphicon glyphicon-trash"/> Delete video</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Are you sure that you want to delete this video?</p>
                                    <p><strong>This action cannot be undone!</strong></p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.closeDeleteModal}>Abort</Button>
                                    <Button onClick={() => this.handleDeleteVideoButton(videoID)}>Delete video</Button>
                                </Modal.Footer>
                            </Modal>
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
	//This function adds the recommend button if the user is a admin/professor/studass
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
    //Function that changes to the videos panel
    handleVideoPanel: function (){
    	if(this.state.videoColor != ColorsClicked.Clicked){
    		this.setState({
    			videoColor: ColorsClicked.Clicked,
    			discussColor: ColorsClicked.Unclicked,
    			videoActive: this.props.needActive
    		});
    	}
    },
    //Function that changes to the discussion panel
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
  //Updates the state that stores the comment
  handleCommentTA: function (e) {
    var comm = e.target.value;
    this.setState({
      comment: comm
    });
  },
  //Adds the comment to the database
  handleComment: function(e){
  	var subject = this.props.subject.subjectID;
  	var chapter = this.props.chapter.chapterID;
  	var subChapter = this.props.subchapter.subChapterID;
  	var userID = this.props.userID;
  	var fullName = this.props.profile.user_metadata.first_name + " " + this.props.profile.user_metadata.last_name;
    var commenterGravatar = this.props.profile.picture;
  	var comment = this.state.comment.replace(/(?:\r\n|\r|\n)/g, '<br />');
  	if(Boolean(comment)){
  		var d = new Date();
  		//Checks if the user is banned before letting him post
  		if(this.props.bantime < d){
		  	Client.addComment(subject, chapter, subChapter, userID, fullName, commenterGravatar, comment,
		  				() => this.triggerReloadComments());
		  	this.setState({
		  		comment: ''
		  	});
  		}else{
  			this.setState({ target: e.target, show: !this.state.show });
  		}
  	}
  },
  //Shows that a video is posted by a professor if it is posted by a professor
  isProfessor: function (professorValue){
  	if(professorValue == 'professor'){
  		return "Posted by a professor!";
  	}else{
  		return "";
  	}
  },
	render: function() {
		let closeCourseModal = () => this.setState({ showCourseModal: false });
        var videosList = null;
        var professorPosted = "";
    	{/*Creates a list of all the videos with related information*/}
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
								<Upvote videoid={v.subChapterVideoID} userID={this.props.userID}/>
								{this.moderateButton(v.videoID, v.userID)}
                                {this.recommendButton(v.videoID, v.Favorite)}
	                		
					</Row>
	              	<div>
	                    {v.Favorite === 1 ? <Row className="recommended">
	                      <Glyphicon glyph="glyphicon glyphicon-arrow-up"/> This video is recommended by a Professor! <Glyphicon glyph="glyphicon glyphicon-star-empty"/>
	                    </Row>
	                    :null}
	                  </div>
							</Col>
							<Col md="5">
	            <div className="commentsWidget">
	              <div className="publishedInfo">Published by {v.fullName} on {v.addDate.substring(0,10)}</div>
                  <div><img className="publishedImage" src={decodeURIComponent(v.userGravatar)} /></div>
	            <Row className="comment">
	              <i className="fa fa-quote-left"/> {v.Description} <i className="fa fa-quote-right"/>
	              <p style={{color: 'green'}}>{this.isProfessor(v.role)}</p>
	            </Row>

	            	</div>
	            	</Col>
	            </div>

					</Row>
					:null}
				</div>
			));
		}
		{/*Creates a list with comments and all needed information*/}
		var discussList = null;
		if(this.state.comments){
			discussList = this.state.comments.map( (d, idx) => (
        <div>
			{this.state.discussColor === ColorsClicked.Clicked ?
            <div className="comments">
              <div className="comment-wrap">
				<div className="commentsPhoto">
						<div><img className="commentsAvatar" src={d.commenterGravatar} /></div>
				</div>
				<div className="comment-block">
						{d.comment.split('<br />').map(function(item, key) {
						  return (
						    <span className="comment-text" key={key}>
						      {item}
						      <br/>
						    </span>
						  )
						})}
						<div className="bottom-comment">
								<div className="comment-date">Published on {d.commentTime} by {d.fullName}</div>
			  			</div>
			  </div>
        	</div>
        </div>
					:null}
				</div>
			));
		}
		return (
			<div>
				{/*Adds the videos/discussion/add video button and the lists with videos and comments*/}
				<Grid bsClass="container" className="subGrid">
					<Row className="subChapterPanelButtonsRow">
					<button className="videoPanelBtn" style={{backgroundColor: this.state.videoColor}}
					onClick={this.handleVideoPanel}><span><Glyphicon glyph="glyphicon glyphicon-play-circle"/>  Videos</span></button>

					<button className="discussPanelBtn" style={{backgroundColor: this.state.discussColor}}
					onClick={this.handleDiscussPanel}><span><Glyphicon glyph="glyphicon glyphicon-comment"/>  Discussion </span></button>

					{this.state.videoColor === ColorsClicked.Clicked ?
						<button className="shareBtn"
					onClick={()=>this.setState({ showCourseModal: true })}><span><Glyphicon glyph="glyphicon glyphicon-plus"/>  Add</span></button>
					:null}
					</Row>
					<Row>
						{this.state.discussColor === ColorsClicked.Clicked ?
                            <div className="comments">
                                <div className="Addcomment-wrap">
				                        <div className="commentsPhoto">
						                    <div><img className="commentsAvatar" src={this.props.profile.picture} /></div>
				                        </div>
				                        <div className="comment-block">
                                        <FormGroup controlId="courseIdForm">
                                            <FormControl
                                                type="text"
                                                className="commentTextArea"
                                                componentClass="textarea"
                                                value={this.state.comment}
                                                placeholder="Enter comment here"
                                                onChange={this.handleCommentTA} />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <div className="bottom-comment">
                                            <div className="comment-date">This comment will be published as "{this.props.profile.user_metadata.first_name} {this.props.profile.user_metadata.last_name}"</div>
                                        </div>
                                        <div>
                                            <ul className="comment-actions">
                                                <li className="reply">
                                                    <div>
                                                        <button className="sendCommentBtn" style={{backgroundColor: this.state.videoColor}}
                                                            onClick={this.handleComment}><span>Post</span>
                                                            <Overlay
											                show={this.state.show}
											                target={this.state.target}
											                placement="top"
											                container={this}
											                containerPadding={20}>
											                  <Popover id="popover-contained" title="You can't comment right now." bantime={this.props.bantime}>
											                    You have been banned until {this.props.bantime.getDate()}-{this.props.bantime.getMonth() + 1}-{this.props.bantime.getFullYear()} for posting inappropriate content.
											                  </Popover>
											              </Overlay></button>
                                                    </div>
                                                 </li>
                                            </ul>
                                        </div>
			                            </div>
                                </div>
      	                    </div>
						:null}
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
					auth={this.props.auth}
					bantime={this.props.bantime}
                    reloadOnSubmit={this.triggerReloadVideos}
                    profile={this.props.profile}/>

			</div>
		);
	}

});

module.exports = SubChapterContent;