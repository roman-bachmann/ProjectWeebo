import React, { PropTypes as T } from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import AuthService from './AuthService.js'
import Lundheim from '../img/lundheim.jpg'
import App from '../img/App.png'
import Facebook from '../img/facebook.png'
import Twitter from '../img/twitter.png'
import './Login.css'
import '../Animate.css'
import ScrollableAnchor from 'react-scrollable-anchor'
// import styles from './styles.module.css'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props.route
    return (
    <div>
      <div className="hero">
      		<div className="animatedBackground infinite background-image"></div>
      		<div className="LogoWrapper"><h1 className="WLogo">W</h1></div>
      		<h3 className="WeeboLogin">Weebo</h3>
      		<div><Button  className="animated LogInButton" bsStyle="primary" onClick={auth.login.bind(this)}><span className="fa fa-sign-in"></span> Sign In</Button></div>
          <div><a href="#MainFeatures"><Button  className="ScrollButton">  <Glyphicon glyph="glyphicon glyphicon-menu-down" className="Glyphicon-arrow"/></Button></a></div>
        </div>
        <div className="featuresSection">
        <ScrollableAnchor id={'MainFeatures'}>
  		    <h3 className="FeaturesTitle">Features</h3>
        </ScrollableAnchor>
      <hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
  		<p className="FeaturesDescription">With Weebo, students are able to watch, rate and share the best educational videos for a specific subject. Professors are then able to verify the quality of content, recommend videos, or even publish an own video. Weebo will be the future for finding educational videos for any subject, independent of university or school. Wasting time on searching videos on Youtube is a past!</p>
  		<ul className="grid">
  			<li>
          <Glyphicon glyph="glyphicon glyphicon-thumbs-up" className="Glyphicon-Login"/>
  				
            <h4>Rating System</h4>
          
  				<p>A user can easily find the best rated videos on Weebo.</p>
  			</li>
  			<li>
          <Glyphicon glyph="glyphicon glyphicon-user"  className="Glyphicon-Login"/>
  				<h4 className="MainFeatures">Professor Panel</h4>
  				<p>Professors have access to an admin panel for adding subject, recommend video or even remove unwanted content.</p>
  			</li>
  			<li>
          <Glyphicon glyph="glyphicon glyphicon-heart-empty"  className="Glyphicon-Login"/>
  				<h4 className="MainFeatures">Favorite</h4>
  				<p>A user can easily find favorite a video to watch it later.</p>
  			</li>
      </ul>
  		</div>
        <div className="featuresSection">
      <div className="features2">
		<h3 className="FeaturesTitle">What professors say</h3>

    <hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
<img className="Pekka" src={Lundheim}></img>
		<p className="quote">Weebo is an amazing product, delivered by young talents from Trondheim in Norway. I am really proud to be a part of their journey and look forward to more features in Weebo. I can't wait until April 27th to see this incredible product.</p>
		<p className="author">— Lars Magne Lundheim</p>
	</div>
  </div>

<div className="featuresSection">
  <div className="features">
  <h3 className="FeaturesTitle">Coming Soon to mobile devices</h3>
  <hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
<div  className="Appimage"><img src={App}></img><img  className="ComingSoon" src="https://myreps.in/images/coming_soon_appstore.png"></img></div>
</div>
	</div>
  <div className="footerLogin">

    <ul className="FooterUL">
			<li><a href="https://www.facebook.com/Weebo-774288392725196/"><img className="facebooklogo" src={Facebook}/></a></li>
			<li><a href="https://twitter.com/weeboteam"><img className="twitterlogo" src={Twitter}/></a></li>
		</ul>

  <p>Made with <Glyphicon glyph="glyphicon glyphicon-heart"/> by <a href="" target="_blank">Team Weebo</a>. Images courtesy to <a href="http://freepik.com/" target="_blank">Freepik</a>.</p>
  <p className="copyrightLogin">And.. Yes! Weebo will always be a free service.</p>

</div>


    </div>

    )
  }
}

export default Login;
