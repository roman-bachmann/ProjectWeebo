import React from 'react'
import {Link} from 'react-router'
import './Contact.css'
import '../fonts/fontawesome/css/font-awesome.css'

export class Contact extends React.Component {
  render() {
    return (
    <div>
        <h2 className="animated ProfileTitle"><i className="fa fa-user"/> About Us</h2>
      <div><hr className="animated ProfileHR"></hr><hr className="animated ProfileHR2"></hr></div>
      	<div className="speakers">
      		<div className="TeamContainer">
      			<div className="col-md-8 col-md-offset-2">
      				<p className="AboutTeamWeebo">ashfølakshfølkahsflkahsflkah fklahsfløahsflkahskf a fsaløksfhøla sfahfsø ahsf a føahsf øa faøls fhaløksf aølkshf aøsf aølkshfaøsfha ølsfa akjslhfalksf askjfhalksf asfhalksfhaf aksjfhalksfhaklsf fasjhflaksfh asfhajksfhaskl fajshfalksf </p>
      			</div>

      			<div className="MainTeamBox">
      				<div className="TeamRow">
      					<a href="#" className="member-profile">
      						<div className="unhover_img">
      						<img className="teamImage" src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/roman.jpg?raw=true" alt="" />
      						</div>
      						<div className="hover_img">
      						<img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/romanbw.jpg?raw=true" alt="" />
      						</div>
      						<span className="TeamRoles">Developer</span>
      						<h4 className="wholeName"><span className="firstname">Roman </span>Bachman </h4>
      					</a>
      					<ul>
      						<li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="#"  target="_blank"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
      					</ul>
      				</div>
      				<div className="TeamRow">
      					<a href="#" className="member-profile">
      						<div className="unhover_img">
      						<img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/sølve.jpg?raw=true" alt="" />
      						</div>
      						<div className="hover_img">
      						<img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/sølvebw.jpg?raw=true" alt="" />
      						</div>
      						<span className="TeamRoles">Devoloper</span>
      						<h4 className="wholeName"><span className="firstname">Sølve</span> Hunvik</h4>
      					</a>
      					<ul>
      						<li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="#"  target="_blank"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
      					</ul>
      				</div>
      				<div className="TeamRow">
      					<a href="#" className="member-profile">
      						<div className="unhover_img">
      						<img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/thay.JPG?raw=true" alt="" />
      						</div>
      						<div className="hover_img">
      						<img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/thaybw.JPG?raw=true" alt="" />
      						</div>
      						<span className="TeamRoles">Front-end/Design</span>
      						<h4 className="wholeName"><span className="firstname">Thayanan</span> Tharmapalan</h4>
      					</a>
      					<ul>
      						<li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="#"  target="_blank"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
      					</ul>
      				</div>
      				<div className="TeamRow">
      					<a href="#" className="member-profile">
      						<div className="unhover_img">
      						<img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/grip.jpg?raw=true" alt="" />
      						</div>
      						<div className="hover_img">
      						<img src="https://github.com/roman-bachmann/ProjectWeebo/blob/master/client/src/img/gripbw.jpg?raw=true" alt="" />
      						</div>
      						<span className="TeamRoles">Back-end</span>
      						<h4 className="wholeName"><span className="firstname">Emil</span> Grip</h4>
      					</a>
      					<ul>
      						<li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="#"  target="_blank"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
      					</ul>
      				</div>
      			</div>

      		</div>
      	</div>
      </div>
    )
  }
}

export default Contact;
