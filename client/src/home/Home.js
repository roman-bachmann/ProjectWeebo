import React, { PropTypes as T } from 'react'
import {Button, Jumbotron, Glyphicon} from 'react-bootstrap'
import AuthService from '../auth/AuthService.js'
import {Link} from 'react-router';
import './Home.css'
import '../Animate.css'
import Client from '../Client.js';
import {LinkContainer} from 'react-router-bootstrap';

var Home = React.createClass({

    render: function () {
        const courseButtons = this.props.courses.map((c, idx) => (
            <span>
            <LinkContainer to="/learn">
                <Button className="animated homeButtons" onClick={() => this.props.onCourseChange(c)}>
                    {c.subjectID + " - " + c.name}
                </Button>
            </LinkContainer>
            {idx%2==1 && <br/>}
            </span>
        ));

        return (
          <div>
            <div className="title">
              <h1 className="animated Welcome">Welcome!</h1>
              <hr className="animated homeHR"></hr><hr className="animated homeHR2"></hr>
                <div className="animated LogoWrap"><h1 className="W_Logo">W</h1></div>
            </div>
            <div className="content">
              <div className="inner">

              {this.props.courses.length > 0 ?
                  <p className="animated SelectTitle">
                      Please select a course to continue.
                  </p>
                  :
                  <p className="animated SelectTitle">
                      You have no courses. Courses can be added under <Glyphicon glyph="glyphicon glyphicon-education"/> Subjects.
                  </p>
              }

              <br />
              {courseButtons}

              </div>
            </div>
          </div>
        )
    }
});

module.exports = Home;
