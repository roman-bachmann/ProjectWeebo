import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import AdminCourseList from './AdminCourseList';

it('renders without crashing', () => {
    var courses = [{}];
    shallow(<AdminCourseList courses={courses}/>);
});

it('renders all courses', () => {
    var courses = [
        {subjectID: "FI1104", name: "20th Century Philosophy"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"},
        {subjectID: "PLU8014", name: "Academic Writing"},
        {subjectID: "TDT4120", name: "Algorithms and Data Structures"},
        {subjectID: "TDT4137", name: "Cognitive Architecture"}
    ];

    const wrapper = shallow(<AdminCourseList courses={courses} />);

    for (var i in courses) {
        const n = (<th>{courses[i].name}</th>);
        global.expect(wrapper.contains(n)).toEqual(true);
    }
});

it('can open delete course modal', () => {
    var courses = [
        {subjectID: "FI1104", name: "20th Century Philosophy"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"},
        {subjectID: "PLU8014", name: "Academic Writing"},
        {subjectID: "TDT4120", name: "Algorithms and Data Structures"},
        {subjectID: "TDT4137", name: "Cognitive Architecture"}
    ];

    const wrapper = shallow(<AdminCourseList courses={courses} />);

    expect(wrapper.state('showModal')).to.equal(false);

    wrapper.find('.removeCourseButton').first().simulate('click', { button: 0 });

    expect(wrapper.state('showModal')).to.equal(true);
    expect(wrapper.state('openModalId')).to.equal("FI1104");
});

it('can open delete course modal and delete course', () => {
    var courses = [
        {subjectID: "TST1234", name: "Test Course"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"},
        {subjectID: "PLU8014", name: "Academic Writing"},
        {subjectID: "TDT4120", name: "Algorithms and Data Structures"},
        {subjectID: "TDT4137", name: "Cognitive Architecture"}
    ];

    var deleteCourseCalled = "none";
    var deleteCourse = function (subjectID) {
        deleteCourseCalled = subjectID;
    }

    const wrapper = shallow(<AdminCourseList courses={courses}
                                             deleteCourse={deleteCourse}/>);

    expect(wrapper.state('showModal')).to.equal(false);

    wrapper.find('.removeCourseButton').first().simulate('click', { button: 0 });

    expect(wrapper.state('showModal')).to.equal(true);
    expect(wrapper.state('openModalId')).to.equal("TST1234");

    wrapper.find('.modalDeleteCourseButton').first().simulate('click', { button: 0 });

    global.expect(deleteCourseCalled).toEqual("TST1234");
    expect(wrapper.state('showModal')).to.equal(false);
});

it('can abort deletion', () => {
    var courses = [
        {subjectID: "TST1234", name: "Test Course"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"},
        {subjectID: "PLU8014", name: "Academic Writing"},
        {subjectID: "TDT4120", name: "Algorithms and Data Structures"},
        {subjectID: "TDT4137", name: "Cognitive Architecture"}
    ];

    var deleteCourseCalled = "none";
    var deleteCourse = function (subjectID) {
        deleteCourseCalled = subjectID;
    }

    const wrapper = shallow(<AdminCourseList courses={courses}
                                             deleteCourse={deleteCourse}/>);

    expect(wrapper.state('showModal')).to.equal(false);

    wrapper.find('.removeCourseButton').first().simulate('click', { button: 0 });

    expect(wrapper.state('showModal')).to.equal(true);
    expect(wrapper.state('openModalId')).to.equal("TST1234");

    wrapper.find('.modalAbortButton').first().simulate('click', { button: 0 });

    expect(wrapper.state('showModal')).to.equal(false);
});
