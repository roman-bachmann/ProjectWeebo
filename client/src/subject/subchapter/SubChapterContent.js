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
              	/*if(idx == 0){
              		return (<div>
              		{this.props.activePanel === this.props.needActive ? 
              			<Row>
                			<Col xs={1} md={1}>
                				<YouTube id={v.videoID} />
                			</Col>
                			<Col xs={1} md={1}><Upvote></Upvote></Col>
            			</Row>
            			:null} 
            			</div>);
              	}*/
              	return (<div>
              		{this.props.activePanel === this.props.needActive ? 
              			<div className="rowParent">
	              			<Row >
	                			<YouTube id={v.videoID} />
	            			</Row>
            			</div>
            			:null} 
            			</div>);
            }, this);
        }

		return (
			<Grid fluid={true}>
			<Row className="shareRow"><button className="shareBtn"><span>Add</span></button></Row>
				{videosList}
			</Grid>
		);
	}

});

module.exports = SubChapterContent;
