import React from 'react'
import {Link} from 'react-router'

export class Contact extends React.Component {
  render() {
    return (
        <div className="ContactBody">
            <h1>Contact page</h1>
            <Link to={'/home'}>Back to Home</Link>
        </div>
    )
  }
}

export default Contact;
