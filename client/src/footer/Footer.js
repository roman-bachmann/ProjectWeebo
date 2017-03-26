import React from 'react';
import './Footer.css'
import {Link} from 'react-router';
import Facebook from '../img/facebook.png'
import Twitter from '../img/twitter.png'

const Footer = React.createClass({
    render: function() {
        return (
          <div className="footer-distributed">
            <div className="footer-wrap">
      			<div className="footer-right">

      				<a href="#"><i className="fa fa-facebook"></i></a>
      				<a href="#"><i className="fa fa-twitter"></i></a>
      				<a href="#"><i className="fa fa-google-plus"></i></a>
      				<a href="#"><i className="fa fa-envelope"></i></a>

      			</div>

      			<div className="footer-left">

      				<p className="footer-links">
      					<a href="#">Home</a>

      					<a href="#">Profile</a>

      					<a href="#">Admin</a>

      					<a href="#">About</a>

      					<a href="#">Contact</a>

      					<a href="#">Log out</a>
      				</p>

      				<p className="copyright">Team Weebo &copy; 2017</p>
      			</div>
            </div>
      		</div>
        );
    }
});

export default Footer;
