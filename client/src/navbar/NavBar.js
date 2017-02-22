var React = require('react');
var Navbar = require("react-bootstrap/lib/Navbar");
var Nav = require("react-bootstrap/lib/Nav");
var NavItem = require("react-bootstrap/lib/NavItem");
var NavDropdown = require("react-bootstrap/lib/NavDropdown");
var MenuItem = require("react-bootstrap/lib/MenuItem");

var NavBar = React.createClass({
    handleCourseChange: function (selectedKey) {
        console.log(selectedKey);
        console.log(this.props.courses[selectedKey]);
        this.props.onCourseChange(this.props.courses[selectedKey]);
    },
    
    render: function () {
        var courseItems;
        
        if (this.props.courses) {
            courseItems = this.props.courses.map((c, idx) => (
                <MenuItem eventKey={idx}>
                    {c.subjectID + " - " + c.name}
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
                        <NavItem eventKey={100} href="www.facebook.com">Login</NavItem>
                        <NavItem eventKey={200} href="#">Sign up</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});

module.exports = NavBar;