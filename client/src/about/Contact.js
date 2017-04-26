import React from 'react'
import './Contact.css'
import '../fonts/fontawesome/css/font-awesome.css'
import '../Animate.css'
import thay from '../img/thay.JPG'
import thaybw from '../img/thaybw.JPG'
import sølvebw from '../img/sølvebw.jpg'
import sølve from '../img/sølve.jpg'
import roman from '../img/roman.jpg'
import romanbw from '../img/romanbw.jpg'
import emil from '../img/grip.jpg'
import emilbw from '../img/gripbw.jpg'

/**
 * This component acts as an Contact page to display information about the creators of Weebo.
 */
export class Contact extends React.Component {
  render() {
    return (
    <div>
        <h2 className="animated ProfileTitle">Contact the Team</h2>
      <div><hr className="animated ProfileHR"></hr><hr className="animated ProfileHR2"></hr></div>
      	<div className="speakers">
      		<div className="TeamContainer">
      			<div className="col-md-8 col-md-offset-2">
      				<p className="animated AboutTeamWeebo">Team Weebo consists of 4 members; Sølve Hunvik (Developer), Roman Backmann (Developer), Thayanan Tharmapalan (Design & Front-end) & Emil Grip (Back-end). Please feel free to contact any of us if you have any questions or enqueries.</p>
      			</div>

      			<div className="MainTeamBox">
      				<div className="animated TeamRow">
      					<a href="#" className="member-profile">
      						<div className="unhover_img">
      						<img className="teamImage" src={sølve} alt="Sølve Hunvik"/>
      						</div>
      						<div className="hover_img">
      						<img src={sølvebw}  alt="Sølve Hunvik"/>
      						</div>
      						<span className="TeamRoles">Developer</span>
      						<h4 className="wholeName"><span className="firstname">Sølve </span>Hunvik </h4>
      					</a>
      					<ul>
      						<li><a href="https://www.facebook.com/Solveh?fref=ts" target="_blank" className="teamSocialIcons"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="https://www.linkedin.com/in/s%C3%B8lve-b%C3%B8-hunvik-a13910120/"  target="_blank" className="teamSocialIcons"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="mailto:srhunvik@stud.ntnu.no" target="_blank" className="teamSocialIcons"><i className="fa fa-envelope"></i></a></li>
      					</ul>
      				</div>
      				<div className="animated TeamRow">
      					<a href="mailto:roman.bachmann@epfl.ch" className="member-profile">
      						<div className="unhover_img">
      						<img src={roman}  alt="Roman Bachmann"/>
      						</div>
      						<div className="hover_img">
      						<img src={romanbw}  alt="Roman Bachmann"/>
      						</div>
      						<span className="TeamRoles">Developer</span>
      						<h4 className="wholeName"><span className="firstname">Roman</span> Bachmann</h4>
      					</a>
      					<ul>
      						<li><a href="https://www.facebook.com/profile.php?id=100006878116639" target="_blank" className="teamSocialIcons"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Froman-bachmann-818b01141%2F&h=ATMlahvnVVAiCRP71ghgus4DXSMT-iM4AYmpseX5wHpcxgwMr475nSqFo2WteBSs0-zduuFG6nUzOdOuzgVdMb7-0ZflFfqwdJVm9r3YaNME2381xXvLGqkb2PVi70WCUuREgdyC1kTSlOTtRez-LmeBraw"  target="_blank" className="teamSocialIcons"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="mailto:roman.bachmann@epfl.ch" target="_blank" className="teamSocialIcons"><i className="fa fa-envelope"></i></a></li>
      					</ul>
      				</div>
      				<div className="animated TeamRow">
      					<a href="mailto:thayanat@stud.ntnu.no" className="member-profile">
      						<div className="unhover_img">
      						<img src={thay}  alt="Thayanan Tharmapalan"/>
      						</div>
      						<div className="hover_img">
      						<img src={thaybw}  alt="Thayanan Tharmapalan"/>
      						</div>
      						<span className="TeamRoles">Front-end & Design</span>
      						<h4 className="wholeName"><span className="firstname">Thayanan</span> Tharmapalan</h4>
      					</a>
      					<ul>
      						<li><a href="https://www.facebook.com/thay.tharma" target="_blank" className="teamSocialIcons"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="https://www.linkedin.com/in/thayanan-tharmapalan/"  target="_blank" className="teamSocialIcons"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="mailto:thayanat@stud.ntnu.no" target="_blank" className="teamSocialIcons"><i className="fa fa-envelope"></i></a></li>
      					</ul>
      				</div>
      				<div className="animated TeamRow">
      					<a href="mailto:emileg@stud.ntnu.no" className="member-profile">
      						<div className="unhover_img">
      						<img src={emil}  alt="Emil Grip"/>
      						</div>
      						<div className="hover_img">
      						<img src={emilbw}  alt="Emil Grip"/>
      						</div>
      						<span className="TeamRoles">Back-end</span>
      						<h4 className="wholeName"><span className="firstname">Emil</span> Grip</h4>
      					</a>
      					<ul>
      						<li><a href="https://www.facebook.com/eegrip?fref=ts" target="_blank" className="teamSocialIcons"><i className="fa fa-facebook"></i></a></li>
      						<li><a href="https://www.linkedin.com/in/emil-eyser-grip-448a6a76/"  target="_blank" className="teamSocialIcons"><i className="fa fa-linkedin"></i></a></li>
      						<li><a href="mailto:emileg@stud.ntnu.no" target="_blank" className="teamSocialIcons"><i className="fa fa-envelope"></i></a></li>
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
