import React from 'react'
import {Link} from 'react-router'
import './About.css'
import AppImage from '../img/App.png'

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
      <p className="aboutWeebo">With Weebo, students are able to watch, rate and share the best educational videos for a specific subject. Professors are then able to verify the quality of content, recommend videos, or even publish an own video. Weebo will be the future for finding educational videos for any subject, independent of university or school. Wasting time on searching videos on Youtube is a past!</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-film"></i></span>
      <h3 className="animated serviceTitle">Watch</h3>
      <p className="aboutWeebo">With Weebo you can instantly find the best videos for a subchapter.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-thumbs-up"></i></span>
      <h3 className="serviceTitle">Rate</h3>
      <p className="aboutWeebo">With our amazing rating system the best videos will always show up first in a subchapter.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutIcons"><i className="fa fa-share-alt"></i></span>
      <h3 className="serviceTitle">Share</h3>
      <p className="aboutWeebo">You can also share the videos you want.</p>
    </div>
  </div>
</div>
<div>
  <hr className="animated aboutSectionHr"/>
</div>
        <div className="service">
          <div className="container">
    <div className="animated col-md-12 col-sm-12">
      <h2 className="aboutWorkflowSectionTitle">Our Workflow</h2>
      <p className="aboutWeebo">With Weebo, students are able to watch, rate and share the best educational videos for a specific subject. Professors are then able to verify the quality of content, recommend videos, or even publish an own video. Weebo will be the future for finding educational videos for any subject, independent of university or school. Wasting time on searching videos on Youtube is a past!</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutWorkflowIcons"><i className="fa fa-cubes"></i></span>
      <h3 className="animated serviceTitle">Research</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutWorkflowIcons"><i className="fa fa-cogs"></i></span>
      <h3 className="animated serviceTitle">Design</h3>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>
    </div>
    <div className="animated col-md-4 col-sm-4">
      <span className="aboutWorkflowIcons"><i className="fa fa-group"></i></span>
      <h3 className="animated serviceTitle">Implement</h3>
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
<h2 className="aboutSectionTitle">Follow Us</h2>
<p className="aboutWeebo">Follow us on social media to catch up with the latest news and updates from Team Weebo. Please share Weebo with friends and family if you like the website. Thanks!</p>
</div>
<div className="animated col-md-4 col-sm-4">
  <span className="aboutIcons"><i className="fa fa-facebook"></i></span>
  <h3 className="animated serviceTitle">Facebook</h3>
</div>
<div className="animated col-md-4 col-sm-4">
  <span className="aboutIcons"><i className="fa fa-twitter"></i></span>
  <h3 className="serviceTitle">Twitter</h3>
</div>
<div className="animated col-md-4 col-sm-4">
  <span className="aboutIcons"><i className="fa fa-google-plus"></i></span>
  <h3 className="serviceTitle">Google Plus</h3>
</div>
</div>
</div>
<div>
<hr className="animated aboutSectionHr"/>
</div>


  <div className="service">
    <div className="container">
<div className="animated col-md-12 col-sm-12">
<h2 className="aboutWorkflowSectionTitle">Future Plans</h2>
<p className="aboutWeebo">Team Weebo is continiously working on improving the user experience. Our next goal is to make Weebo fully compitable to mobile devices with apps launching for both Andorid and iOS devices as well as Apple TV 4 in a couple of months.</p>
</div>
<img src={AppImage} className="aboutAppImage"/>
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
