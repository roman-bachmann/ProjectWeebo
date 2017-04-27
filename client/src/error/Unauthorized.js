import React from 'react'
import {Link} from 'react-router'

/**
 * Component that loads when a user tries to access a resource without having access
 */
export class Unauthorized extends React.Component {
  render() {
    return (
        <div className="PageNotFound">
            <h1 className="PageNotFoundTitle">Error - You are not authorized to view this resource!</h1>
            <div className="LogoWrap"><h1 className="W_Logo">W</h1></div>
            <Link to={'/home'} className="ReturnHome">Return to Homepage</Link>
        </div>
    )
  }
}

export default Unauthorized;
