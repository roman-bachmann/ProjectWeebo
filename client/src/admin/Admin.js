import React from 'react'
import Client from '../Client.js'
import AdminCourseList from './AdminCourseList.js'
import AdminAddCourse from './AdminAddCourse.js'
import {Image, Glyphicon} from 'react-bootstrap'
import greenWidget from '../img/widgetGreenCrop.jpg'
import redWidget from '../img/widgetRedCrop.jpg'
import './Admin.css'
import CourseListIcon from '../img/CourseListIcon.jpeg'

/**
 * This component acts as a way for admins to manage courses
 */
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
                <h2 className="animated adminTitle"> Admin Page</h2>
                <div><hr className="animated ProfileHR"></hr><hr className="animated ProfileHR2"></hr></div>
                <div className="animated addDeleteCourseWidgets">
                    <div className=" animated AddCoursewidget">
                        <div className="addCoursecover">
                            <img src={greenWidget} alt=""/>
                        </div>
                        <Image className="addCoursephoto" src={CourseListIcon} circle/>
                        <div className="addACourseTitle">Create course</div>
                        <AdminAddCourse reloadAllCourses={this.loadAllCourses}/>
                        <ul className="addCourseProfileUL">
                            <li className="addCourseProfileULLI"><Glyphicon className="Userglyph" glyph="glyphicon glyphicon-plus-sign"/></li>
                        </ul>
                    </div>

                    <div className=" animated deleteCoursewidget">
                        <div className="deleteCoursecover">
                            <img src={redWidget} alt=""/>
                        </div>
                        <Image className="deleteCoursephoto" src={CourseListIcon} circle/>
                        <h2 className="DeleteCourses">Delete courses</h2>
                        <p>Delete courses from the database</p>
                        <AdminCourseList courses={this.state.allCourses}
                                         deleteCourse={this.deleteCourse}/>
                        <ul className="deleteCourseProfileUL">
                            <li className="deleteCourseProfileULLI">
                                <Glyphicon className="Userglyph" glyph="glyphicon glyphicon-minus-sign"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Admin;
