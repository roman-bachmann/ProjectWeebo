import React from 'react'
import {Link} from 'react-router'

/**
 * Component that loads when a user tries to access a resource without having access
 */
export class Unauthorized extends React.Component {
  render() {
    return (
        <div className="AdminBody">
            <h1>Error - You are not authorized to view this resource!</h1>
            <Link to={'/home'}>Back to Home</Link>
        </div>
    )
  }
}

export default Unauthorized;
