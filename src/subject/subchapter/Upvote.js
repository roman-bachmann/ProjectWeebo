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
			<div> 
				<Grid>
				<Row>
					<button className="upvoteBtn" onClick={this.addVote}>▲</button>
				</Row>
				<Row>
					<p className="votenumber">{this.state.votecount}</p>
				</Row>
				<Row>
					<button className="downvoteBtn" onClick={this.removeVote}>▼</button>
				</Row>
				</Grid>
			</div>
		);
	}

});

module.exports = Upvote;