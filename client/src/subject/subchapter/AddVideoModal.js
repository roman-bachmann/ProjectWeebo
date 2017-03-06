var React = require('react');
import {Modal, Button} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
import './AddVideoModal.css';
import Client from '../../Client.js';

const MySmallModal = React.createClass({
  getInitialState: function () {
    return {
      userInput: ''
    };
  },

   handleUserInput: function(e) {
    /*  The link that caused troubles, so that I had to split on &
        https://www.youtube.com/watch?v=5kcdRBHM7kM&t=2s
        Please update split method if other problems with links occurs.
    */
    var videoId = '';
    var videoSplit = e.target.value.split("=");
    if(videoSplit.length != 1){
      //If user posts the whole link
      var videoWithoutExtras = videoSplit[1].split("&");
      videoId = videoWithoutExtras[0];
    }
    else{
      //If user only posts video ID
      var videoWithoutExtras = videoSplit[0].split("&");
      videoId = videoWithoutExtras[0];
    }
    this.setState({
      userInput: videoId
    });
  },

  handleShare: function() {
    console.log(this.state.userInput);
    var userID = 'frodo';
    var subjectID = this.props.subject;
    var chapterID = this.props.chapter;
    var subChapterID = this.props.subchapter;
    var videoID = this.state.userInput;
    Client.videoShare(userID, subjectID, chapterID, subChapterID, videoID);
    this.props.refreshPanel();
    this.props.onHide();
  },

  render() {
    return (
      <Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Add video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your video might not show instantly in the panel. Try reopening your panel after sharing your video.</p>
          <p>YouTube link/id: <input type="text" onChange={this.handleUserInput}/></p>
          <YouTube id={this.state.userInput}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="closeBtn" onClick={this.props.onHide}>Close</Button>
          <Button className="acceptBtn" onClick={this.handleShare}>Share</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = MySmallModal;