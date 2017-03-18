import React, { PropTypes as T } from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import AuthService from './AuthService.js'
import './Login.css'
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
      		<div className="LogIn"><Button bsStyle="primary" onClick={auth.login.bind(this)}>Log In / Sign Up</Button></div>
      	</div>
        <div className="features">
  		<h3 className="FeaturesTitle">Features</h3>
  		<p className="FeaturesDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
  		<hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
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

      <div className="reviews">
		<h3 className="OthersSay">What others say</h3>
          		<hr className="LoginHR"></hr><hr className="LoginHR2"></hr>
		<p className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
		<p className="author">— Pekka</p>

		<p className="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
		<p className="author">— Pekka</p>

		<p className="quote">Donec commodo dolor augue, vitae faucibus tortor tincidunt in. Aliquam vitae leo quis mi pulvinar ornare. Integer eu iaculis metus.</p>
		<p className="author">— Pekka</p>
	</div>

  <div className="footerLogin">

    <ul className="FooterUL">
			<li><a href="https://www.facebook.com/Weebo-774288392725196/"><img src={"https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png"}/></a></li>
			<li><a href="https://twitter.com/weeboteam"><img src="https://c866088.ssl.cf3.rackcdn.com/assets/twitter30x30.png"/></a></li>
		</ul>

  <p>Made by <a href="" target="_blank">Team Weebo</a>. Images courtesy to <a href="http://freepik.com/" target="_blank">Freepik</a>.</p>
  <p className="copyrightLogin">And.. Yes! Weebo will always be a free service.</p>

</div>


    </div>

    )
  }
}

export default Login;
