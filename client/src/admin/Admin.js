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
                  <h2 className="animated adminTitle"> Admin Page</h2>
<div><hr className="animated ProfileHR"></hr><hr className="animated ProfileHR2"></hr></div>
                <div className=" animated AddCoursewidget">
                  <div className="addCoursecover">
                    <img src="https://s-media-cache-ak0.pinimg.com/originals/f0/b9/52/f0b9523dacbecc5bd4e2aae496a9c8c2.jpg" />
                  </div>
                <Image className="addCoursephoto" src={CourseListIcon} circle/>
                <div className="addACourseTitle">Add a new course</div>
                <AdminAddCourse reloadAllCourses={this.loadAllCourses}/>
                  <ul className="addCourseProfileUL">
                    <li className="addCourseProfileULLI"><Glyphicon className="Userglyph" glyph="glyphicon glyphicon-plus-sign"/></li>
                  </ul>
                </div>

                <div className=" animated Coursewidget">
                  <div className="Coursecover">
                    <img src="http://www.techandall.com/wp-content/uploads/2013/08/bg6.jpg" />
                  </div>
                <Image className="deleteCoursephoto" src={CourseListIcon} circle/>
                <h2 className="DeleteCourses">Delete courses</h2>
                <p>Delete subjects from the database</p>
                <AdminCourseList courses={this.state.allCourses}
                                 deleteCourse={this.deleteCourse}/>
                  <ul className="CourseProfileUL">
                    <li className="CourseProfileULLI"><Glyphicon className="Userglyph" glyph="glyphicon glyphicon-minus-sign"/></li>
                  </ul>
                </div>
            </div>
        )
    }
});

module.exports = Admin;
