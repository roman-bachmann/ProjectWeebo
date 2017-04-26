import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import NavBar from './NavBar';

it('renders without crashing', () => {
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

    expect(wrapper.find('NavDropdown').first().length).to.equal(1);
    wrapper.find('NavDropdown').first().simulate('click', { button: 0 });
});
