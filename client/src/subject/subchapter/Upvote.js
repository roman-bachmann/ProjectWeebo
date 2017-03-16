import './Upvote.css';
import {Grid, Row, Col} from 'react-bootstrap';
var React = require('react');
import Client from '../../Client.js';
import {Glyphicon} from 'react-bootstrap';

//General colors for vote buttons
var ColorsVote = { 	"Upgreen": "white",
                    "Downred": "white",
                    "BgUnclicked": "#efefef",
                    "BgClicked": '#7f7c7c',
};

var Upvote = React.createClass({
	getInitialState: function () {
		return {
			votes: 0,
			 users: {},
			 containsUser: false,
			 upVoteColor: ColorsVote.Upgreen,
			 downVoteColor: ColorsVote.Downred,
			 bgUp: ColorsVote.BgUnclicked,
			 bgDown: ColorsVote.BgUnclicked
		};
	},
	loadVotesFromServer: function (videoID) {
		Client.getVotesForVideo(videoID, (voteData) => {
			if (voteData) {
				var usersDict = {};
				var counts = 0;
				for (var i = 0; i < voteData.length; i++) {
					counts += voteData[i].rating_score;
					usersDict[voteData[i].userID] = voteData[i].rating_score;
				}
				var userID = this.props.userID;
				var containsUserValue = false;

				//checks if the users ID is in the dictionary that stores ID and vote value
				if(userID in usersDict){
					//If the user has already voted the button colors will change to the vote value.
					containsUserValue = true;
					//if the user voted up
					if(usersDict[userID] == 1){
						this.setState({ votes: counts, users: usersDict, containsUser: containsUserValue, bgUp: ColorsVote.BgClicked});
					}
					//if the user voted down
					else{
						this.setState({ votes: counts, users: usersDict, containsUser: containsUserValue, bgDown: ColorsVote.BgClicked});
					}
				}
				else{
					this.setState({ votes: counts, users: usersDict, containsUser: containsUserValue});
				}
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
			Client.videoVote(this.props.userID, this.props.videoid, 1, d);
			var newVote = this.state.votes + 1;
			this.setState({
				votes: newVote,
				containsUser: true,
				bgUp: ColorsVote.BgClicked
			});
		}
	},
	removeVote: function (){
		//check authentication and update database here
		if(this.state.containsUser == false){
			var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
			Client.videoVote(this.props.userID, this.props.videoid, -1, d);
			var newVote = this.state.votes - 1;
			this.setState({
				votes: newVote,
				containsUser: true,
				bgDown: ColorsVote.BgClicked

			});
		}
	},
	render: function() {
		return (
            <div className="upVoteWrap">
                <Col md={1}>
                    <button className="upvoteBtn" onClick={this.addVote} style={{color: this.state.upVoteColor, backgroundColor: this.state.bgUp}}>
                        <Glyphicon glyph="glyphicon glyphicon-triangle-top"/>
                    </button>
                </Col>
                <Col md={1}>
                    <p className="votenumber">{this.state.votes}</p>
                </Col>
                <Col md={1}>
                    <button className="downvoteBtn" onClick={this.removeVote} style={{color: this.state.downVoteColor, backgroundColor: this.state.bgDown}}>
                        <Glyphicon glyph="glyphicon glyphicon-triangle-bottom"/>
                        </button>
                </Col>
            </div>
		);
	}

});

module.exports = Upvote;
