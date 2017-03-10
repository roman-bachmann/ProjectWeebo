import React, { PropTypes as T } from 'react'
import AuthService from '../auth/AuthService.js'

export class Admin extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props.route
    return (
        <div className="AdminBody">
            <h1>Admin page</h1>
        </div>
    )
  }
}

export default Admin;
