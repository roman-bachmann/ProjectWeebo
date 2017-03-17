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
                <Button onClick={() => this.props.onCourseChange(c)}>
                    {c.subjectID + " - " + c.name}
                </Button>
            </LinkContainer>
            {idx%2==1 && <br/>}
            </span>
        ));

        return (
          <div>
            <div className="title">
              <h2 className="Welcome">Welcome to Weebo!</h2>
                <div className="LogoWrap"><h1 className="W_Logo">W</h1></div>
            </div>
            <div className="content">
              <div className="inner">
                <p>
                    Please select a subject to continue.
                </p>
                <br />
                {courseButtons}

              </div>
            </div>
          </div>
        )
    }
});

module.exports = Home;
