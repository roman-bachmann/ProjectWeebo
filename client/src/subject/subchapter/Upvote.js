import './Upvote.css';
import {Grid, Row, Col} from 'react-bootstrap';
var React = require('react');
import Client from '../../Client.js';

var Upvote = React.createClass({
	getInitialState: function () {
		//fetch from database here
		return {votes: 0, users: []};
	},
	loadVotesFromServer: function (videoID) {
		Client.getVotesForVideo(videoID, (voteData) => {
			if (voteData) {
				var usersList = [];
				var counts = 0;
				for (var i = 0; i < voteData.length; i++) {
					counts += voteData[i].rating_score;
					usersList.push(voteData[i].userID);
					console.log(usersList);
					console.log(counts);
				}
				this.setState({ votes: counts, users: usersList});				
			}
		});
    },

	componentWillMount: function (){
        this.loadVotesFromServer(this.props.videoid);
    },
    componentWillReceiveProps: function (nextProps) {
		if (nextProps.videoID) {
			this.loadVotesFromServer(nextProps.videoID);
		}
	},

	addVote: function () {
		//if user haven't already voted add vote and update database. 
		console.log(this.props.userID);
		var newVote = this.state.votes + 1;
		this.setState({
			votes: newVote
		});
	},
	removeVote: function (){
		//check authentication and update database here
		var newVote = this.state.votes - 1;
		this.setState({
			votes: newVote
		});
	},
	render: function() {
		return (
			<div className="upVoteWrap"> 
					<button className="upvoteBtn" onClick={this.addVote}>▲</button>
					<div className="numDiv">
						<p className="votenumber">{this.state.votes}</p>
					</div>
					<button className="downvoteBtn" onClick={this.removeVote}>▼</button>
			</div>
		);
	}

});

module.exports = Upvote;