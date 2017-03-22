var React = require('react');
import {Modal, Button, Glyphicon, Popover, ButtonToolbar, Overlay} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
import './AddVideoModal.css';
import Client from '../../Client.js';

const MySmallModal = React.createClass({
  getInitialState: function () {
    return {
      userInput: '',
      sharingsite: 'YouTube',
      description: '',
      show: false
    };
  },

   handleUserInput: function(e) {
    //This function finds the YouTube video id to change the userInput state so that it shows in the YouTube iframe.
    var url = e.target.value;
    var videofinds = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    var videoid = '';
    if(videofinds != null) {
       videoid = videofinds[1];
    }else{
      videoid = url;
    }
    this.setState({
      userInput: videoid
    });
  },
  handleDescription: function (e) {
    var descr = e.target.value;
    this.setState({
      description: descr
    });
  },

  handleShare: function(e) {
    console.log(this.props.bantime);

    var d = new Date();
    console.log(d);
    //Check if bantime is before todays date
    if(this.props.bantime < d){
      console.log("yo");
      if(this.state.sharingsite === 'YouTube'){
        console.log(this.state.userInput);
        var descr = this.state.description;
        var userID = this.props.userID;
        var subjectID = this.props.subject;
        var chapterID = this.props.chapter;
        var subChapterID = this.props.subchapter;
        var videoID = this.state.userInput;
        Client.videoShare(userID, subjectID, chapterID, subChapterID, videoID, descr,
                          () => this.props.reloadOnSubmit());
        this.props.onHide();
      }else{
        this.props.onHide();
      }
    }else{
      this.setState({ target: e.target, show: !this.state.show });
    }

  },
  videoSiteChange: function(e) {
    this.setState({
      sharingsite: e.target.value
    });
    this.handleUserInput();
  },

  render() {
    const popoverTop = (
      <Popover id="popover-positioned-top" title="Popover top">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );
    return (
      <Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm"><Glyphicon glyph="glyphicon glyphicon-film"/> Add video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><span>YouTube </span><input name="sharingsite" type="radio" value="YouTube" onChange={this.videoSiteChange} checked={this.state.sharingsite === 'YouTube'}/>
           <span> Vimeo </span><input name="sharingsite" type="radio" value="Vimeo" onChange={this.videoSiteChange} checked={this.state.sharingsite === 'Vimeo'}/>
          </p>
          <p>{this.state.sharingsite} Link/ID: <input type="text" onChange={this.handleUserInput}/></p>
          <p className="Description">Description: <textarea onChange={this.handleDescription}/></p>
          {this.state.sharingsite === 'YouTube' ?
            <YouTube id={this.state.userInput}/>
          :<h5 className="VimeoLater" style={{color: 'orange'}}>Vimeo will be supported later.</h5>}
        </Modal.Body>
        <Modal.Footer>
          <Button className="closeBtn" onClick={this.props.onHide}><Glyphicon glyph="glyphicon glyphicon-remove-circle"/></Button>
          <ButtonToolbar className="acceptToolbar">
              <Button className="acceptBtn" onClick={this.handleShare}><Glyphicon glyph="glyphicon glyphicon-share-alt"/></Button>
                <Overlay
                show={this.state.show}
                target={this.state.target}
                placement="top"
                container={this}
                containerPadding={20}>
                  <Popover id="popover-contained" title="You can't share videos right now." bantime={this.props.bantime}>
                    You have been banned until {this.props.bantime.getDate()}-{this.props.bantime.getMonth() + 1}-{this.props.bantime.getFullYear()} for posting inappropriate content.
                  </Popover>
              </Overlay>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = MySmallModal;
