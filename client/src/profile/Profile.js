import React, { PropTypes as T } from 'react'
import AuthService from '../auth/AuthService.js'
import ProfileDetails from './ProfileDetails.js'
import './Profile.css'

export class Profile extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

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

  logout() {
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render() {
    const { profile } = this.state
    return (
      <div>
        <h2 className="ProfileTitle">Profile Page</h2>
        <div><hr></hr></div>
        <ProfileDetails profile={profile}></ProfileDetails>
      </div>
    )
  }
}

export default Profile;
