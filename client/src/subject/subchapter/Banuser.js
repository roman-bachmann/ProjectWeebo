var React = require('react');
import {Modal, Button, Glyphicon, Popover, ButtonToolbar, Overlay} from 'react-bootstrap';
import Client from '../../Client.js';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Banuser.css';

const MySmallModal = React.createClass({
  getInitialState: function () {
    return {
      controlledDate: null,
    };
  },
  handleChange: function (event, date) {
    this.setState({
      controlledDate: date,
    });
  },
  handleBan: function(){
    this.props.onHide();
  },

  render() {

    return (
      <Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Ban user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ban the user <span style={{color: 'red'}}>{this.props.userID}</span> for a desired time</p>
          <div className="datepick">
          <MuiThemeProvider>
            <DatePicker
              hintText="Pick ban date"
              value={this.state.controlledDate}
              onChange={this.handleChange}
            />
          </MuiThemeProvider>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="closeBtn" onClick={this.props.onHide}><Glyphicon glyph="glyphicon glyphicon-remove-circle"/></Button>
          <Button className="acceptBtn" onClick={this.handleBan}><Glyphicon glyph="glyphicon glyphicon-share-alt"/></Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = MySmallModal;