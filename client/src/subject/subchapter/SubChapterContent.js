var React = require('react');
import {Row, Col, Grid} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');

var React = require('react');

var SubChapterContent = React.createClass({
	loadCommentsFromServer: function () {
		var videos = ['DTYkSUOmEwg', 'BXKBpsA702s', 'pgl37R7hILE'];
		this.setState({
           	data: videos,
        });
     //  	var videos = [];
     //  	if(this.props.value[2] === 'subchap0'){
        // 	videos = ['DTYkSUOmEwg', 'BXKBpsA702s', 'pgl37R7hILE'];
     //  	} else if(this.props.value[2] === 'subchap1'){
        // 	videos = ['Ix_ZDi-q9qM'];
     //  	} else {
        // 	videos = ['KEkrWRHCDQU', '7RBE4BAqRBs'];
     //  	}
     //  	this.setState({
        // 	data: videos,
     //  	});
     //  	console.log("mounted");
    },

    componentWillMount: function (){
      	this.loadCommentsFromServer()
    },

	render: function() {
		if(this.state.data){
            var videosList = this.state.data.map(function (name, index){
              	return (<Row>
                			<Col xs={4} md={2}>
                				<YouTube id={name} />
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
