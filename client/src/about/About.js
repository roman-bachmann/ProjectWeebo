import React from 'react'
import {Link} from 'react-router'

export class About extends React.Component {
  render() {
    return (
        <div className="AboutBody">
            <h1>About page</h1>
            <Link to={'/home'}>Back to Home</Link>
        </div>
    )
  }
}

export default About;
