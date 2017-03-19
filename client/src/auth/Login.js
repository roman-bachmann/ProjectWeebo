import React, { PropTypes as T } from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import AuthService from './AuthService.js'
import './Login.css'
import '../Animate.css'
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
      		<div className="background-image"></div>
      		<div className="LogoWrapper"><h1 className="WLogo">W</h1></div>
      		<h3 className="WeeboLogin">Weebo</h3>
      		<div><Button  className="animated LogInButton" bsStyle="primary" onClick={auth.login.bind(this)}>Log In / Sign Up</Button></div>
          <div><Button  className="ScrollButton"><a href="#MainFeatures">  <Glyphicon glyph="glyphicon glyphicon-arrow-down" className="Glyphicon-arrow"/></a></Button></div>
      	</div>
        <div className="features">
  		<h3 className="FeaturesTitle">Features</h3>
      <hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
  		<p className="FeaturesDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
  		<ul className="grid">
  			<li>
          <Glyphicon glyph="glyphicon glyphicon-thumbs-up" className="Glyphicon-Login"/>
  				<h4 className="MainFeatures">Rating system</h4>
  				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
  			</li>
  			<li>
          <Glyphicon glyph="glyphicon glyphicon-user"  className="Glyphicon-Login"/>
  				<h4 className="MainFeatures">Professor Panel</h4>
  				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
  			</li>
  			<li>
          <Glyphicon glyph="glyphicon glyphicon-pencil"  className="Glyphicon-Login"/>
  				<h4 className="MainFeatures">Profile Page</h4>
  				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.</p>
  			</li>
      </ul>
  		</div>

      <div className="features">
		<h3 className="FeaturesTitle">What others say</h3>

    <hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
<img className="Pekka" src="https://innsidawls.itea.ntnu.no/user-profile-service/rest/files/0db9c213-65f8-3a6e-a03d-b4d3bc533030"></img>
		<p className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
		<p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
		<p className="author">— Pekka</p>
	</div>

  <div className="features">
  <h3 className="FeaturesTitle">Coming Soon to mobile devices</h3>
  <hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
<div  className="Appimage"><img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/App.png?raw=true"></img><img  className="ComingSoon" src="https://myreps.in/images/coming_soon_appstore.png"></img></div>
</div>
  <div className="footerLogin">

    <ul className="FooterUL">
			<li><a href="https://www.facebook.com/Weebo-774288392725196/"><img src={"https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png"}/></a></li>
			<li><a href="https://twitter.com/weeboteam"><img src="https://c866088.ssl.cf3.rackcdn.com/assets/twitter30x30.png"/></a></li>
		</ul>

  <p>Made with <Glyphicon glyph="glyphicon glyphicon-heart"/> by <a href="" target="_blank">Team Weebo</a>. Images courtesy to <a href="http://freepik.com/" target="_blank">Freepik</a>.</p>
  <p className="copyrightLogin">And.. Yes! Weebo will always be a free service.</p>

</div>


    </div>

    )
  }
}

export default Login;
