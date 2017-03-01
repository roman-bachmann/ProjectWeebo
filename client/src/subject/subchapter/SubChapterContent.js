var React = require('react');
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
              	return (<Row>
                			<Col xs={4} md={2}>
                				<YouTube id={v.videoID} />
                			</Col>
                			<Col xs={1} md={1} ><Upvote></Upvote></Col>
            			</Row>);
            }, this);
        }

		return (
			<div>
				{videosList}
			</div>
		);
	}

});

module.exports = SubChapterContent;
