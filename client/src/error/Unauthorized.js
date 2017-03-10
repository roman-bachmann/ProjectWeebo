import React from 'react'

export class Unauthorized extends React.Component {
  render() {
    return (
        <div className="AdminBody">
            <h1>Error - You are not authorized to view this resource!</h1>
        </div>
    )
  }
}

export default Unauthorized;
