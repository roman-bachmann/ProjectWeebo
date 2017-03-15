var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
var VideoModal = require('./AddVideoModal.js');
import Client from '../../Client.js';
import './SubChapterContent.css';

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
							<Row className="recommended">
								Instructor recommends!
							</Row>
							<Row className="comment">
								Comments lorem ipsum...
							</Row>
						</Col>
					</div>
				:null}
				</Row>
			));
		} else {
			var videosList = null;
		}























		// if(this.state.videos){
        //     var videosList = this.state.videos.map(function (v, idx){
        //       	if(idx == 0){
        //       		return (<Grid bsClass="container" className="subGrid">
		//               		{this.props.activePanel === this.props.needActive ?
		//               			<Row>
		//               			<VideoModal
		//               				show={this.state.showCourseModal}
		//               				onHide={closeCourseModal}
		//               				subject={this.props.subject.subjectID}
		//               				chapter={this.props.chapter.chapterID}
		//               				subchapter={this.props.subchapter.subChapterID}/>
		// 					      <Col md={7}>
		// 					      	<YouTube id={v.videoID} />
		// 					      </Col>
		// 					      <Col md={3} className="subCol">
		// 					      	<Upvote videoid={v.subChapterVideoID} userID={this.props.userID}></Upvote>
		// 					      </Col>
		// 					      <Col md={2} className="subCol">
		// 					      	<button className="shareBtn" onClick={()=>this.setState({ showCourseModal: true })}><span>Add</span></button>
		// 					      </Col>
		// 					    </Row>
	    //         			:null}
        //     			</Grid>);
        //       	}
        //       	else {
	    //           	return (<Grid bsClass="container" className="subGrid">
		// 	              		{this.props.activePanel === this.props.needActive ?
		// 	              			<Row>
		// 						      <Col md={7} className="subCol">
		// 						      	<YouTube id={v.videoID} />
		// 						      </Col>
		// 						      <Col md={5}  className="subCol">
		// 						      	<Upvote videoid={v.subChapterVideoID} userID={this.props.userID}></Upvote>
		// 						      </Col>
		// 						    </Row>
		//             			:null}
	    //         			</Grid>);
        //       	}
        //     }, this);
        // }
        // if(this.state.videos.length == 0){
        // 	return (<Grid bsClass="container" className="subGrid">
	    //           		{this.props.activePanel === this.props.needActive ?
	    //           			<Row>
		// 						<VideoModal
		// 							show={this.state.showCourseModal}
		// 							onHide={closeCourseModal}
		// 							subject={this.props.subject.subjectID}
		// 							chapter={this.props.chapter.chapterID}
		// 							subchapter={this.props.subchapter.subChapterID}/>
		// 						<Col md={7}>
		// 						</Col>
		// 						<Col md={3} className="subCol">
		// 						</Col>
		// 						<Col md={2} className="subCol">
		// 							<button className="shareBtn" onClick={()=>this.setState({ showCourseModal: true })}><span>Add</span></button>
		// 						</Col>
		// 					</Row>
	    //     			:null}
        // 			</Grid>);
        // }



		return (
			<div>
				<Grid bsClass="container" className="subGrid">
					{videosList}
				</Grid>

				<VideoModal
					show={this.state.showCourseModal}
					onHide={closeCourseModal}
					subject={this.props.subject.subjectID}
					chapter={this.props.chapter.chapterID}
					subchapter={this.props.subchapter.subChapterID}
					userID={this.props.userID}/>

				<button className="shareBtn" onClick={()=>this.setState({ showCourseModal: true })}><span>Add</span></button>
			</div>
		);
	}

});

module.exports = SubChapterContent;
