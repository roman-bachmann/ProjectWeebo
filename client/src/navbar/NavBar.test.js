import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import NavBar from './NavBar';

it('renders without crashing', () => {
    // <NavBar
    //     courses={this.state.courses}
    //     onCourseChange={this.changeSelectedCourse}
    //     auth={this.props.route.auth}
    //     userID={this.state.userID}
    //     onCourseAdd={this.handleCourses.bind(this)}
    //     profile={this.state.profile} />

    const courses = [{}];
    const onCourseChange = function () {};
    const auth = {
        loggedIn: function () {return true;},
        isAdmin: function () {return true;},
        logout: function () {}
    };
    const userID = "";
    const onCourseAdd = function () {};
    const profile = {};

    shallow(<NavBar courses={courses}
                    onCourseChange={onCourseChange}
                    auth={auth}
                    userID={userID}
                    onCourseAdd={onCourseAdd}
                    profile={profile} />);
});

it('can click dropdown button to add courses', () => {
    var courses = [];
    var selectedCourse = {};
    const onCourseChange = function (newCourse) {
        selectedCourse = newCourse;
    };
    const auth = {
        loggedIn: function () {return true;},
        isAdmin: function () {return true;},
        logout: function () {}
    };
    const userID = "npmTestUser";
    const onCourseAdd = function () {};
    const profile = {};

    const wrapper = shallow(<NavBar courses={courses}
                                    onCourseChange={onCourseChange}
                                    auth={auth}
                                    userID={userID}
                                    onCourseAdd={onCourseAdd}
                                    profile={profile} />);

    // console.log(wrapper.find('Dropdown.Toggle').length)
    // console.log(wrapper.find('MenuItem').length)

    wrapper.find('NavDropdown').first().simulate('click', { button: 0 });

    // console.log(wrapper.find('MenuItem').length)

    //console.log(wrapper)
    //wrapper.find('.dropdownAddCoursesButton').simulate('click', { button: 0 });

    //expect(wrapper.state('showCourseModal')).to.equal(true);

});
