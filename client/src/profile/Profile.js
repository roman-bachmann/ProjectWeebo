import React, { PropTypes as T } from 'react'
import AuthService from '../auth/AuthService.js'
import ProfileDetails from './ProfileDetails.js'
import './Profile.css'
import '../Animate.css'
import '../fonts/fontawesome/css/font-awesome.css'
import {Glyphicon} from 'react-bootstrap';


export class Profile extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  render() {
    const { profile } = this.state
    return (
      <div>
        <h2 className="animated ProfileTitle">Profile Page</h2>
        <ProfileDetails
            profile={profile}
            courses={this.props.courses}
            onCourseAdd={this.props.onCourseAdd}
            userID={this.props.userID} />
      </div>
    )
  }
}

export default Profile;
