import React, { PropTypes as T } from 'react'
import {Row, Col, Image} from 'react-bootstrap'

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
          <Image src={profile.picture} circle/>
        </Col>
        <Col md={6}>
          <h3>Profile</h3>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
          <p><strong>Nickname: </strong> {profile.nickname}</p>
          <p><strong>Address: </strong> {address}</p>
          <p><strong>Created At: </strong> {profile.created_at}</p>
          <p><strong>Updated At: </strong> {profile.updated_at}</p>
          <p><strong>user_id: </strong> {profile.user_id}</p>
        </Col>
      </Row>
    )
  }
}

export default ProfileDetails;
