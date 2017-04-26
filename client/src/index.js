import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';

/**
 * Top most part of the component rendering. Takes the Routes Component and using
 * ReactDOM renders it in the element 'root' that it gets from the index.html file.
 */
ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
