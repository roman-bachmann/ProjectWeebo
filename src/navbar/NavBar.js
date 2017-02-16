var React = require('react');
var Navbar = require("react-bootstrap/lib/Navbar");
var Nav = require("react-bootstrap/lib/Nav");
var NavItem = require("react-bootstrap/lib/NavItem");
var NavDropdown = require("react-bootstrap/lib/NavDropdown");
var MenuItem = require("react-bootstrap/lib/MenuItem");

var NavBar = React.createClass({
    render: function () {
        return (
<Navbar inverse collapseOnSelect style={{background: '#4a5051'}}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Project Weebo</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={3} title="Subjects" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>TDT4120 - Algorithms and Data Structures</MenuItem>
            <MenuItem eventKey={3.2}>TMA4140 - Discrete Mathematics</MenuItem>
            <MenuItem eventKey={3.3}>TDT4145 - Data Modelling, Databases and Database Management Systems</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Login</NavItem>
        <NavItem eventKey={2} href="#">Sign up</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)
    }
});

module.exports = NavBar;