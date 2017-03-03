var React = require('react');
var Navbar = require("react-bootstrap/lib/Navbar");
var Nav = require("react-bootstrap/lib/Nav");
var NavItem = require("react-bootstrap/lib/NavItem");
var NavDropdown = require("react-bootstrap/lib/NavDropdown");
var MenuItem = require("react-bootstrap/lib/MenuItem");
import {Link} from 'react-router';

var NavBar = React.createClass({
    handleCourseChange: function (selectedKey) {
        this.props.onCourseChange(this.props.courses[selectedKey]);
    },

    render: function () {
        var courseItems;

        if (this.props.courses) {
            courseItems = this.props.courses.map((c, idx) => (
                <MenuItem eventKey={idx}>
                    <Link to="/learn">
                    {c.subjectID + " - " + c.name}
                    </Link>
                </MenuItem>
            ));
        } else {
            courseItems = <MenuItem eventKey={0}>You have no courses.</MenuItem>
        }

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
                        <NavDropdown
                                eventKey={300}
                                title="Subjects"
                                id="basic-nav-dropdown"
                                onSelect={this.handleCourseChange} >
                            {courseItems}
                            <MenuItem divider />
                            <MenuItem eventKey={400}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={99}>
                            <Link
                                className="link"
                                to="/login"
                                activeClassName="active" >
                                Login with Facebook
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});

module.exports = NavBar;