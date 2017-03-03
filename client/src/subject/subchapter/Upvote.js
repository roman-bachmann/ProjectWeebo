import './Upvote.css';
import {Grid, Row, Col} from 'react-bootstrap';

var React = require('react');

var Upvote = React.createClass({
	getInitialState: function () {
		//fetch from database here
		return {votecount: 5};
	},
	addVote: function () {
		//if user haven't already voted add vote and update database. 
		
		var newVote = this.state.votecount + 1;
		this.setState({
			votecount: newVote
		});
	},
	removeVote: function (){
		//check authentication and update database here
		var newVote = this.state.votecount - 1;
		this.setState({
			votecount: newVote
		});
	},
	render: function() {
		return (
			<div className="upVoteWrap"> 
					<button className="upvoteBtn" onClick={this.addVote}>▲</button>
					<p className="votenumber">{this.state.votecount}</p>
					<button className="downvoteBtn" onClick={this.removeVote}>▼</button>
			</div>
		);
	}

});

module.exports = Upvote;