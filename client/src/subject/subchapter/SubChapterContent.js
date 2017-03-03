var React = require('react');
import './SubChapterContent.css';
import {Row, Col, Grid} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
import Client from '../../Client.js';

var SubChapterContent = React.createClass({
	getInitialState: function () {
		return { videos: [] };
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
		if(this.state.videos){
            var videosList = this.state.videos.map(function (v, idx){
              	if(idx == 0){
              		return (<Grid bsClass="container" className="subGrid">
		              		{this.props.activePanel === this.props.needActive ? 
		              			<Row>
							      <Col md={7}>
							      	<YouTube id={v.videoID} />
							      </Col>
							      <Col md={3} className="subCol">
							      	<Upvote ></Upvote>
							      </Col>
							      <Col md={2} className="subCol">
							      	<button className="shareBtn"><span>Add</span></button>
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

		return (
			<div>
			{/*<Row className="shareRow"><button className="shareBtn"><span>Add</span></button></Row>*/}
				{videosList}
			</div>
		);
	}

});

module.exports = SubChapterContent;
