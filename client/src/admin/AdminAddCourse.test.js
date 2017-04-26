import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import AdminAddCourse from './AdminAddCourse';

it('renders without crashing', () => {
    const reloadAllCourses = function () {}
    shallow(<AdminAddCourse reloadAllCourses={reloadAllCourses}/>);
});

it('can create a new course', () => {
    const reloadAllCourses = function () {}
    const wrapper = shallow(<AdminAddCourse reloadAllCourses={reloadAllCourses}/>);

    wrapper.setState({ newCourseID: "course ID" });
    wrapper.setState({ newCourseName: "course name" });
    expect(wrapper.state('newCourseID')).to.equal("course ID");
    expect(wrapper.state('newCourseName')).to.equal("course name");

    wrapper.find('.submitCourse').first().simulate('click', { button: 0 });
    expect(wrapper.state('newCourseID')).to.equal("");
    expect(wrapper.state('newCourseName')).to.equal("");

    wrapper.find('FormControl').at(0).simulate('change', {target: {value: 'course ID'}});
    wrapper.find('FormControl').at(1).simulate('change', {target: {value: 'course name'}});
    expect(wrapper.state('newCourseID')).to.equal("course ID");
    expect(wrapper.state('newCourseName')).to.equal("course name");

    wrapper.find('.submitCourse').first().simulate('click', { button: 0 });
    expect(wrapper.state('newCourseID')).to.equal("");
    expect(wrapper.state('newCourseName')).to.equal("");
});
