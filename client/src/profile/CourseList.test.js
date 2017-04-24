import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Client from '../Client.js';
import CourseList from './CourseList';

it('renders without crashing', () => {
    const courses = [{}];
    const userID = "user_id";
    shallow(<CourseList courses={courses}
                        userID={userID} />);
});

it('can open remove course modal', () => {
    const userID = "npmTestUser";
    var courses = [
        {subjectID: "FI1104", name: "20th Century Philosophy"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"}
    ];

    const wrapper = shallow(<CourseList courses={courses}
                                        userID={userID} />);

    wrapper.find('.removeCourseButton').first().simulate('click', { button: 0 });

    expect(wrapper.state('showModal')).to.equal(true);
    expect(wrapper.state('openModalId')).to.equal("FI1104");
});

it('can open remove course modal and remove course', () => {
    const userID = "npmTestUser";
    const subjectID = "TST1234";
    //Client.addCourseForUser(userID, "student", subjectID);

    var courses = [
        {subjectID: subjectID, name: "npm test course"}
    ];

    var onCourseAddCalled = false;
    var onCourseAdd = function (userID) {
        onCourseAddCalled = true;
    }

    const wrapper = shallow(<CourseList courses={courses}
                                        userID={userID}
                                        onCourseAdd={onCourseAdd}/>);

    wrapper.find('.removeCourseButton').first().simulate('click', { button: 0 });

    expect(wrapper.state('showModal')).to.equal(true);
    expect(wrapper.state('openModalId')).to.equal("TST1234");

    wrapper.find('.modalRemoveCourseButton').first().simulate('click', { button: 0 });

    global.expect(onCourseAddCalled).toEqual(true);
    expect(wrapper.state('showModal')).to.equal(false);
});
