import React, { PropTypes as T } from 'react'
import {Row, Col, Image, Glyphicon} from 'react-bootstrap'
import './ProfileDetails.css'

export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render() {
    const { profile } = this.props
    const { first_name, last_name } = profile.user_metadata || {}
    return (
      <Row className="ProfileRow">
        <Col md={2} mdOffset={4}>
          <Image className="profileimg" src={profile.picture} circle/>
        </Col>
        <Col md={6}>
          <p className="ProfileName">{first_name}<br></br>{last_name}</p>
          <p className="ProfileDetails"><strong><Glyphicon glyph="glyphicon glyphicon-envelope"/>  Email: </strong> {profile.email}</p>
          <p className="ProfileDetails"><strong><Glyphicon glyph="glyphicon glyphicon-eye-open"/>  Nickname: </strong><br></br> {profile.nickname}</p>
        </Col>
      </Row>
    )
  }
}

export default ProfileDetails;
