import React, { PropTypes as T } from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import './ProfileDetails.css'

export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render() {
    const { profile } = this.props
    const { address } = profile.user_metadata || {}
    return (
      <Row>
        <Col md={2} mdOffset={4}>
          <Image className="profileimg" src={profile.picture} circle/>
        </Col>
        <Col md={6}>
          <p className="ProfileName">{profile.name}</p>
          <p className="ProfileDetails"><strong>Email: </strong> {profile.email}</p>
          <p className="ProfileDetails"><strong>Nickname: </strong> {profile.nickname}</p>
        </Col>
      </Row>
    )
  }
}

export default ProfileDetails;
