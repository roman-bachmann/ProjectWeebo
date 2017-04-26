import React from 'react';
import './Footer.css'
import {Link} from 'react-router';

/**
 * Footer component hosting links to different parts of the Website and social media
 */
const Footer = React.createClass({
    render: function() {
        return (
          <div className="footer-distributed">
            <div className="footer-wrap">
      			<div className="footer-right">

      				<a href="https://www.facebook.com/Weebo-774288392725196"><i className="fa fa-facebook"></i></a>
      				<a href="https://plus.google.com/106378086979104202590"><i className="fa fa-google-plus"></i></a>
      				<a href="mailto:teamweebo2017@gmail.com"><i className="fa fa-envelope"></i></a>

      			</div>

      			<div className="footer-left">

      				<p className="footer-links">
                        <Link to="/home">Home</Link>
                        <Link to="/profile">Profile</Link>
                        {this.props.auth.isAdmin() && <Link to="/admin">Admin</Link> }
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/login" onClick={this.props.auth.logout.bind(this)}>Log out</Link>
      				</p>

      				<p className="copyright">Team Weebo &copy; 2017</p>
      			</div>
            </div>
      		</div>
        );
    }
});

export default Footer;
