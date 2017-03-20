import React, { PropTypes as T } from 'react'
import {Row, Col, Image, Glyphicon} from 'react-bootstrap'
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
<div><hr animated className="LoginHR"></hr><hr animated className="LoginHR2"></hr></div>
      <div className="widget">
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
    </div>
    )
  }
}

export default ProfileDetails;
