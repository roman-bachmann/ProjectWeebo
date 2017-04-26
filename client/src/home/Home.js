import React from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import './Home.css'
import '../Animate.css'
import {LinkContainer} from 'react-router-bootstrap';

/**
 * Home page component rendering a quick access view to the user's courses
 */
var Home = React.createClass({
    render: function () {
        const courseButtons = this.props.courses.map((c, idx) => (
            <span key={'courseButtonIdx' + idx}>
            <LinkContainer to="/learn">
                <Button className="animated homeButtons" onClick={() => this.props.onCourseChange(c)}>
                    {c.subjectID + " - " + c.name}
                </Button>
            </LinkContainer>
            {idx%2 === 1 && <br/>}
            </span>
        ));

        return (
          <div>
            <div>
              <h2 className="animated ProfileTitle">Home</h2>
            <div><hr className="animated homeHR"></hr><hr className="animated homeHR2"></hr></div>
            </div>
            <div className="content">
              <div className="inner">
                <div className="homeWrap">
              {this.props.courses.length > 0 ?
                  <p className="animated SelectTitle">
                      Please select a course to continue.
                  </p>
                  :
                  <p className="animated SelectTitle">
                      You have no courses. <br/> Courses can be added via  <span className="noCourses"><Glyphicon glyph="glyphicon glyphicon-education"/> Courses</span> in the Menu.
                  </p>
              }

              <br />
              {courseButtons}
                </div>
              </div>
            </div>
            <div>
              <hr className="animated aboutSectionHr"/>
            </div>
          </div>
        )
    }
});

module.exports = Home;
