var React = require('react');
import './NavBar.css';
import '../fonts/fontawesome/css/font-awesome.css'
import {Glyphicon} from 'react-bootstrap';

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
            subjectName: (<span><i className='fa fa-graduation-cap'/> Subjects</span>),
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
                <LinkContainer to="/learn">
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

                    {this.props.auth.loggedIn() ? (
                        <Nav pullRight>
                            {this.props.auth.isAdmin() &&
                                <LinkContainer className="Nav__link" to="/admin">
                                    <NavItem eventKey={77}>
                                        <Glyphicon glyph="glyphicon glyphicon-wrench"/> Admin
                                    </NavItem>
                                </LinkContainer>
                            }
                            <LinkContainer className="Nav__link" to="/profile">
                                <NavItem eventKey={88}>
                                    <Glyphicon glyph="glyphicon glyphicon-user"/> Profile
                                </NavItem>
                            </LinkContainer>
                            <NavItem eventKey={111} onClick={this.props.auth.logout.bind(this)}><Glyphicon glyph="glyphicon glyphicon-log-out"/> Log Out</NavItem>
                        </Nav>
                    ) : (
                        <Nav pullRight>
                            <NavItem eventKey={99} onClick={this.props.auth.login.bind(this)}><Glyphicon glyph="glyphicon glyphicon-log-in"/>Log In / Sign Up</NavItem>
                        </Nav>
                    )}

                </Navbar.Collapse>
            </Navbar>
        );
    }
});

module.exports = NavBar;
