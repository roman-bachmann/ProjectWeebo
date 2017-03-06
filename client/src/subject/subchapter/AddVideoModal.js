var React = require('react');
import {Modal, Button} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
import './AddVideoModal.css';
import Client from '../../Client.js';

const MySmallModal = React.createClass({
  getInitialState: function () {
    return {
      userInput: '',
      sharingsite: 'YouTube',
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
    if(this.state.sharingsite === 'YouTube'){
      console.log(this.state.userInput);
      var userID = 'frodo';
      var subjectID = this.props.subject;
      var chapterID = this.props.chapter;
      var subChapterID = this.props.subchapter;
      var videoID = this.state.userInput;
      Client.videoShare(userID, subjectID, chapterID, subChapterID, videoID);
      this.props.onHide();
    }else{
      this.props.onHide();
    }
  },
  videoSiteChange: function(e) {
    this.setState({
      sharingsite: e.target.value
    });
    this.handleUserInput();
  },

  render() {
    return (
      <Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Add video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><span>YouTube </span><input name="sharingsite" type="radio" value="YouTube" onChange={this.videoSiteChange} checked={this.state.sharingsite === 'YouTube'}/> 
           <span> Vimeo </span><input name="sharingsite" type="radio" value="Vimeo" onChange={this.videoSiteChange} checked={this.state.sharingsite === 'Vimeo'}/>
          </p>
          <p>{this.state.sharingsite} link/id: <input type="text" onChange={this.handleUserInput}/></p>
          {this.state.sharingsite === 'YouTube' ? 
            <YouTube id={this.state.userInput}/>
          :<h3 style={{color: 'orange'}}>Vimeo will be supported later.</h3>}
          <p><span style={{color: 'red'}}>Notice: </span>You need to reopen your active panel to see the video you shared.</p>
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