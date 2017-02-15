import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var NavBar = require('./navbar/NavBar.js');
var Accordion = require('./subject/subchapter/Accordion.js');
var ChapTabs = require('./subject/chapter/ChapterView.js');

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <ChapTabs />
      </div>
    );
  }
}

export default App;
