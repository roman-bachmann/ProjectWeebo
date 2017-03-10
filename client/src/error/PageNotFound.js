import React from 'react'
import {Link} from 'react-router'

export class PageNotFound extends React.Component {
  render() {
    return (
        <div className="AdminBody">
            <h1>Error 404 - Page not found!</h1>
            <Link to={'/home'}>Back to Home</Link>
        </div>
    )
  }
}

export default PageNotFound;
