var React = require('react');
import {Modal, Button} from 'react-bootstrap';

const MySmallModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Add video</h4>
          <p>Subject: {this.props.subject}</p>
          <p>Chapter: {this.props.chapter}</p>
          <p>Subchapter: {this.props.subchapter}</p>
          
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = MySmallModal;