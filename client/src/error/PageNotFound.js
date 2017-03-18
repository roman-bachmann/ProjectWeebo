import React from 'react'
import {Link} from 'react-router'
import './PageNotFound.css'

export class PageNotFound extends React.Component {
  render() {
    return (
        <div className="PageNotFound">
            <h1 className="PageNotFoundTitle">Error 404 - Page not found!</h1>
            <div className="LogoWrap"><h1 className="W_Logo">W</h1></div>
            <Link to={'/home'} className="ReturnHome">Return to Homepage</Link>
        </div>
    )
  }
}

export default PageNotFound;
