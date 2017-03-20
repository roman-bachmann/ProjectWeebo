import React, { PropTypes as T } from 'react'
import {Image, Glyphicon} from 'react-bootstrap'
import CourseList from './CourseList.js'
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
          <img src="http://i.imgur.com/yqB0erk.jpg" />
        </div>
      <Image className="photo" src={profile.picture} circle/>
        <p className="ProfileName">{first_name}<br></br>{last_name}</p>
        <p className="ProfileDetails"><strong><Glyphicon glyph="glyphicon glyphicon-envelope"/>  Email: </strong> {profile.email}</p>
        <p className="ProfileDetails"><strong><Glyphicon glyph="glyphicon glyphicon-eye-open"/>  Nickname: </strong><br></br> {profile.nickname}</p>
        <ul className="ProfileUL">
          <li className="ProfileULLI"><Glyphicon className="Userglyph" glyph="glyphicon glyphicon-user"/></li>
        </ul>
      </div>

      <CourseList
          courses={this.props.courses}
          onCourseAdd={this.props.onCourseAdd}
          userID={this.props.userID} />
    </div>
    )
  }
}

export default ProfileDetails;
