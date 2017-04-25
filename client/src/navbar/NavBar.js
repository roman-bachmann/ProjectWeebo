var React = require('react');
import './NavBar.css';
import '../fonts/fontawesome/css/font-awesome.css'
import {Image, Glyphicon} from 'react-bootstrap';

var FontAwesome = require('react-fontawesome');
var Navbar = require("react-bootstrap/lib/Navbar");
var Nav = require("react-bootstrap/lib/Nav");
var NavItem = require("react-bootstrap/lib/NavItem");
var NavDropdown = require("react-bootstrap/lib/NavDropdown");
var MenuItem = require("react-bootstrap/lib/MenuItem");
var AddCoursesModal = require('./AddCoursesModal.js');
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';




var NavBar = React.createClass({
    getInitialState: function () {
        return {
            subjectName: (<span><i className='fa fa-graduation-cap'/> Courses</span>),
            showCourseModal: false
        };
    },

    handleCourseDropdown: function (selectedKey) {
        // If we select to add courses
        if (selectedKey === 'addCoursesKey') {
            console.log("Adding courses!");
            this.setState({ showCourseModal: true });
        }
        // If we select a course
        else if (selectedKey === parseInt(selectedKey, 10)) {
            this.props.onCourseChange(this.props.courses[selectedKey]);
            //var subject = this.props.courses[selectedKey].subjectID;
            //this.setState({subjectName: subject});
        }
    },

    render: function () {
        let modalClose = () => this.setState({ showCourseModal: false });

        var courseItems;

        //console.log(this.props.courses);

        if (this.props.courses) {
            courseItems = this.props.courses.map((c, idx) => (
                <LinkContainer to="/learn" key={'navBarLink' + idx}>
                    <MenuItem eventKey={idx}>
                        {c.subjectID + " - " + c.name}
                    </MenuItem>
                </LinkContainer>
            ));
        }

        return (
            <Navbar inverse collapseOnSelect className="theNavBar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/home">
                            Weebo
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>

                        {this.props.auth.loggedIn() && (
                            <NavDropdown
                                    eventKey={300}
                                    title={this.state.subjectName}
                                    id="basic-nav-dropdown"
                                    onSelect={this.handleCourseDropdown} >
                                {courseItems}
                                {this.props.courses[0] && <MenuItem divider />}
                                <MenuItem eventKey={'addCoursesKey'}><Glyphicon glyph="glyphicon glyphicon-pencil"/> Add courses</MenuItem>
                                <AddCoursesModal
		              				show={this.state.showCourseModal}
		              				onHide={modalClose}
                                    userID={this.props.userID}
                                    onCourseAdd={this.props.onCourseAdd} />
                            </NavDropdown>
                        )}

                    </Nav>

                    {this.props.auth.loggedIn() && (
                        <Nav pullRight>
                            <NavDropdown
                                    eventKey={500}
                                    title={<Image className=" animated profileNavPhoto" src={this.props.profile.picture} circle/>}
                                    id="basic-nav-dropdown" >
                                {this.props.auth.isAdmin() &&
                                    <LinkContainer className="Nav__link" to="/admin">
                                        <MenuItem eventKey={77}>
                                            Admin
                                        </MenuItem>
                                    </LinkContainer>
                                }
                                <LinkContainer className="Nav__link" to="/profile">
                                    <NavItem eventKey={88}>
                                        Profile
                                    </NavItem>
                                </LinkContainer>
                                <LinkContainer to="/about">
                                    <MenuItem eventKey={501}>
                                        About
                                    </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/contact">
                                    <MenuItem eventKey={502}>
                                        Contact
                                    </MenuItem>
                                </LinkContainer>
                                <MenuItem eventKey={111} onClick={this.props.auth.logout.bind(this)}>
                                    Log Out
                                </MenuItem>
                            </NavDropdown>
                        </Nav>
                    )}

                </Navbar.Collapse>
            </Navbar>
        );
    }
});

module.exports = NavBar;
