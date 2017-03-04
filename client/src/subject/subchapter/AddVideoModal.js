var React = require('react');
import {Modal, Button} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
import './AddVideoModal.css';

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
    var videoSplit = e.target.value.split("=");
    var videoWithoutExtras = videoSplit[1].split("&");
    var videoId = videoWithoutExtras[0];
    this.setState({
      userInput: videoId
    });
  },

  handleShare: function() {
    console.log(this.state.userInput);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Add video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Subject: {this.props.subject} Chapter: {this.props.chapter} Subchapter: {this.props.subchapter}</p>
          <p>YouTube link: <input type="text" onChange={this.handleUserInput}/></p>
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