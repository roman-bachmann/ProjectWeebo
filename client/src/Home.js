import React, { PropTypes as T } from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import AuthService from './auth/AuthService.js'
import {Link} from 'react-router';
import './Home.css'
import Client from './Client.js';
import {LinkContainer} from 'react-router-bootstrap';

var Home = React.createClass({

    render: function () {
        const courseButtons = this.props.courses.map((c, idx) => (
            <span>
            <LinkContainer to="/learn">
                <Button className="homeButtons" onClick={() => this.props.onCourseChange(c)}>
                    {c.subjectID + " - " + c.name}
                </Button>
            </LinkContainer>
            {idx%2==1 && <br/>}
            </span>
        ));

        return (
          <div>
            <div className="title">
              <h1 className="Welcome">Welcome!</h1>
              <hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
                <div className="LogoWrap"><h1 className="W_Logo">W</h1></div>
            </div>
            <div className="content">
              <div className="inner">

              {this.props.courses.length > 0 ?
                  <p className="SelectTitle">
                      Please select a subject to continue.
                  </p>
                  :
                  <p className="SelectTitle">
                      You have no courses. Courses can be added in the Subjects Dropdown in the Navigation.
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
