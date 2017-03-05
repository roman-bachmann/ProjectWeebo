var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
var VideoModal = require('./AddVideoModal.js');
import Client from '../../Client.js';

var SubChapterContent = React.createClass({
	getInitialState: function () {
		return { 
			videos: [],
			smShow: false
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
	handleAddVideo: function () {

	},

	render: function() {
		let smClose = () => this.setState({ smShow: false });
		if(this.state.videos){
            var videosList = this.state.videos.map(function (v, idx){
              	if(idx == 0){
              		return (<Grid bsClass="container" className="subGrid">
		              		{this.props.activePanel === this.props.needActive ? 
		              			<Row>
		              			<VideoModal 
		              				show={this.state.smShow} 
		              				onHide={smClose} 
		              				subject={this.props.subject.subjectID}
		              				chapter={this.props.chapter.chapterID}
		              				subchapter={this.props.subchapter.subChapterID}/>
							      <Col md={7}>
							      	<YouTube id={v.videoID} />
							      </Col>
							      <Col md={3} className="subCol">
							      	<Upvote ></Upvote>
							      </Col>
							      <Col md={2} className="subCol">
							      	<button className="shareBtn" onClick={()=>this.setState({ smShow: true })}><span>Add</span></button>
							      </Col>
							    </Row>
	            			:null} 
            			</Grid>);
              	}
              	else {
	              	return (<Grid bsClass="container" className="subGrid">
			              		{this.props.activePanel === this.props.needActive ? 
			              			<Row>
								      <Col md={7} className="subCol">
								      	<YouTube id={v.videoID} />
								      </Col>
								      <Col md={5}  className="subCol">
								      	<Upvote ></Upvote>
								      </Col>
								    </Row>
		            			:null} 
	            			</Grid>);
              	}
            }, this);
        }
        if(this.state.videos.length == 0){
        	return (<Grid bsClass="container" className="subGrid">
		              		{this.props.activePanel === this.props.needActive ? 
		              			<Row>
		              			<VideoModal 
		              				show={this.state.smShow} 
		              				onHide={smClose} 
		              				subject={this.props.subject.subjectID}
		              				chapter={this.props.chapter.chapterID}
		              				subchapter={this.props.subchapter.subChapterID}/>
		              			<Col md={7}>
		              			</Col>
		              			<Col md={3} className="subCol">
							      	
							      </Col>
							      <Col md={2} className="subCol">
							      	<button className="shareBtn" onClick={()=>this.setState({ smShow: true })}><span>Add</span></button>
							      </Col>
							</Row>
	            			:null} 
	            			</Grid>);
        }

		return (
			<div>

				{videosList}
			</div>
		);
	}

});

module.exports = SubChapterContent;
