import React from 'react'
import {Link} from 'react-router'
import './About.css'

export class About extends React.Component {
  render() {
    return (
        <div className="AboutBody">
          <h2 className="animated ProfileTitle">About</h2>
        <div><hr className="animated ProfileHR"></hr><hr className="animated ProfileHR2"></hr></div>
        <div className="animated service">
          <div className="container">
    <div className="animated col-md-12 col-sm-12">
      <h2 className="aboutSectionTitle">What Is Weebo?</h2>
      <p>With Weebo, students are able to watch, rate and share the best educational videos for a specific subject. Professors are then able to verify the quality of content, recommend videos, or even publish an own video. Weebo will be the future for finding educational videos for any subject, independent of university or school. Wasting time on searching videos on Youtube is a past!</p>

    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-film"></i></span>
      <h3 className="animated serviceTitle">Watch</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-thumbs-up"></i></span>
      <h3 className="serviceTitle">Rate</h3>
      <p>This website template is brought to you by Tooplate. You can modify and use it for any website. You can change icons by looking at <a rel="nofollow" href="http://fortawesome.github.io/Font-Awesome/examples/" target="_parent">examples</a>.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-share-alt"></i></span>
      <h3 className="serviceTitle">Share</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>
    </div>
  </div>
</div>
<div>
  <hr className="animated aboutSectionHr"/>
</div>
        <div className="service">
          <div className="container">
    <div className="animated col-md-12 col-sm-12">
      <h2 className="aboutSectionTitle">Our Workflow</h2>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-cubes"></i></span>
      <h3 className="animatedserviceTitle">Research</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-cogs"></i></span>
      <h3 className="animated serviceTitle">Design</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-group"></i></span>
      <h3 className="animated serviceTitle">Implement</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>
    </div>
  </div>
</div>
  <div>
    <hr className="animated aboutSectionHr"/>
  </div>
</div>
    )
  }
}

export default About;
