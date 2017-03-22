import React from 'react'
import Client from '../Client.js'
import AdminCourseList from './AdminCourseList.js'
import AdminAddCourse from './AdminAddCourse.js'
import {Image, Glyphicon} from 'react-bootstrap'
import widgetbg from '../img/widget_background_crop.jpg'
import './Admin.css'
import CourseListIcon from '../img/CourseListIcon.jpeg'

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
                  <h2 className="animated adminTitle"><i className="fa fa-street-view"/> Admin Page</h2>
<div><hr className="animated ProfileHR"></hr><hr className="animated ProfileHR2"></hr></div>
                <div className=" animated AddCoursewidget">
                  <div className="addCoursecover">
                    <img src={widgetbg} />
                  </div>
                <Image className="addCoursephoto" src={CourseListIcon} circle/>
                <div className="addACourseTitle">Add a new course</div>
                <AdminAddCourse reloadAllCourses={this.loadAllCourses}/>
                  <ul className="addCourseProfileUL">
                    <li className="addCourseProfileULLI"><Glyphicon className="Userglyph" glyph="glyphicon glyphicon-plus"/></li>
                  </ul>
                </div>

                <h2>Delete courses</h2>
                <p>Delete subjects from the database</p>
                <AdminCourseList courses={this.state.allCourses}
                                 deleteCourse={this.deleteCourse}/>



            </div>
        )
    }
});

module.exports = Admin;
