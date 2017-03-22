var React = require('react');
import {Modal, Button, Glyphicon, Popover, ButtonToolbar, Overlay} from 'react-bootstrap';
import Client from '../../Client.js';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Banuser.css';



const MySmallModal = React.createClass({
  getInitialState: function () {
    var oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    return {
      controlledDate: oneWeek,
      banperiod: 7
    };
  },
  handleChange: function (event, date) {
    var today = new Date();
    var timeDiff = Math.abs(date.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    this.setState({
      controlledDate: date,
      banperiod: diffDays,
    });
  },
  handleBan: function(){
    var d = this.state.controlledDate;
    var date = d.getFullYear() + '-';
    var month = d.getMonth() + 1;
    var monthString = '';
    if(month < 10){
      monthString = '0' + month;
    }else{
      monthString = month.toString();
    }
    date += monthString + - + d.getDate() + ' 23:59:59';
    console.log(date);
    Client.banUser(this.props.userID, date, this.props.subject);
    this.props.onHide();
  },
  render() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    return (
      <Modal {...this.props} bsSize="medium" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm"><Glyphicon glyph="glyphicon glyphicon-ban-circle"/>Ban user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ban the user <span style={{color: 'red'}}>{this.props.userID}</span> for a desired time. The user will be prevented from posting videos in this subject for the time period.</p>
          <div className="datepick">
          <p className="picktext">Pick date: </p>
          <MuiThemeProvider className="datepicker">
            <DatePicker className="datepicker"
              hintText="Pick ban date"
              value={this.state.controlledDate}
              onChange={this.handleChange}
              disableYearSelection={true}
              minDate={tomorrow}
            />
          </MuiThemeProvider>
          </div>
          <p>The user will be banned for {this.state.banperiod} days.</p>
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