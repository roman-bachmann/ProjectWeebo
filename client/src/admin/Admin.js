import React from 'react'
import Client from '../Client.js'
import AdminCourseList from './AdminCourseList.js'
import AdminAddCourse from './AdminAddCourse.js'

var Admin = React.createClass({
    getInitialState: function () {
        return {
            allCourses: []
        }
    },

    componentWillMount: function () {
        this.loadAllCourses();
    },

    loadAllCourses: function () {
        Client.getAllCourses((crs) => {
            this.setState({
                allCourses: crs
            });
        })
    },

    deleteCourse: function (subjectID) {
        Client.deleteCourse(subjectID, () => this.loadAllCourses());
    },



    render() {
        return (
            <div className="AdminBody">
                <h1>Admin page</h1>

                <h2>Add a new course</h2>
                <AdminAddCourse reloadAllCourses={this.loadAllCourses}/>

                <h2>Delete courses</h2>
                <p>Delete subjects from the database</p>
                <AdminCourseList courses={this.state.allCourses}
                                 deleteCourse={this.deleteCourse}/>



            </div>
        )
    }
});

module.exports = Admin;
