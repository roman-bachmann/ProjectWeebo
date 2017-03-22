import React, { PropTypes as T } from 'react'
import AuthService from '../auth/AuthService.js'
import Client from '../Client.js'
import AdminCourseList from './AdminCourseList.js'
import AdminAddCourse from './AdminAddCourse.js'

var Admin = React.createClass({

  render() {
    const { auth } = this.props.route
    return (
        <div className="AdminBody">
            <h1>Admin page</h1>

            <h2>Add a new course</h2>
            <AdminAddCourse />

            <h2>Delete courses</h2>
            <p>Delete subjects from the database</p>
            <AdminCourseList />


        </div>
    )
  }
});

module.exports = Admin;
