import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var Col = require("react-bootstrap/lib/Col");

var NavBar = require('./navbar/NavBar.js');
var ChapTabs = require('./subject/chapter/ChapterView.js');

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="App">
        	<ChapTabs />
        </div>
      </div>
    );
  }
}

export default App;
