import React, { PropTypes as T } from 'react'
import {Image, Glyphicon} from 'react-bootstrap'
import CourseList from './CourseList.js'
import CourseListIcon from '../img/CourseListIcon.jpeg'
import './ProfileDetails.css'
import '../Animate.css'


export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render() {
    const { profile } = this.props
    const { first_name, last_name } = profile.user_metadata || {}
    return (
    <div>
<div><hr className="animated ProfileHR"></hr><hr className="animated ProfileHR2"></hr></div>
      <div className=" animated widget">
        <div className="cover">
          <img src="https://s-media-cache-ak0.pinimg.com/originals/f0/b9/52/f0b9523dacbecc5bd4e2aae496a9c8c2.jpg" />
        </div>
      <Image className="photo" src={profile.picture} circle/>
      <div className="ProfileDetailsContent">
        <p className="ProfileName">{first_name}<br></br>{last_name}</p>
        <p className="ProfileDetails"><strong><Glyphicon glyph="glyphicon glyphicon-envelope"/>  Email: </strong> {profile.email}</p>
      </div>
        <ul className="ProfileUL">
          <li className="ProfileULLI"><Glyphicon className="Userglyph" glyph="glyphicon glyphicon-user"/></li>
        </ul>
      </div>

      <div className=" animated Coursewidget">
        <div className="Coursecover">
          <img src="http://i.imgur.com/yqB0erk.jpg" />
        </div>
      <Image className="Coursephoto" src={CourseListIcon} circle/>
            <div className="CourseList"><CourseList
                courses={this.props.courses}
                onCourseAdd={this.props.onCourseAdd}
                userID={this.props.userID} />
            </div>
        <ul className="CourseProfileUL">
          <li className="CourseProfileULLI"><Glyphicon className="Userglyph" glyph="glyphicon glyphicon-pencil"/></li>
        </ul>
      </div>

    </div>
    )
  }
}

export default ProfileDetails;
