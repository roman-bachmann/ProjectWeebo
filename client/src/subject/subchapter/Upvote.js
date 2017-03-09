import './Upvote.css';
import {Grid, Row, Col} from 'react-bootstrap';
var React = require('react');
import Client from '../../Client.js';

var Upvote = React.createClass({
	getInitialState: function () {
		//fetch from database here
		return {
			votes: 0,
			 users: [],
			 containsUser: false
			};
	},
	loadVotesFromServer: function (videoID) {
		Client.getVotesForVideo(videoID, (voteData) => {
			console.log("done fetching.");
			if (voteData) {
				var usersList = [];
				var counts = 0;
				for (var i = 0; i < voteData.length; i++) {
					counts += voteData[i].rating_score;
					usersList.push(voteData[i].userID);
				}
				var userID = this.props.userID;
				var containsUserValue = false;
				for(var i = 0; i < usersList.length; i++){
					if(usersList[i]==userID){
						containsUserValue = true;
					}
				}
				this.setState({ votes: counts, users: usersList, containsUser: containsUserValue});
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
		if(this.state.containsUser == false){
			var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
			console.log(d);
			Client.videoVote(this.props.userID, this.props.videoid, 1, d);
			var newVote = this.state.votes + 1;
			this.setState({
				votes: newVote,
				containsUser: true
			});
		}
	},
	removeVote: function (){
		//check authentication and update database here
		if(this.state.containsUser == false){
			var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
			console.log(d);
			Client.videoVote(this.props.userID, this.props.videoid, -1, d);
			var newVote = this.state.votes - 1;
			this.setState({
				votes: newVote,
				containsUser: true
			});
		}
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