import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Home from './Home';

it('renders without crashing', () => {
    var courses = [{}];
    shallow(<Home courses={courses}/>);
});

it('can click all course buttons', () => {
    var courses = [
        {subjectID: "FI1104", name: "20th Century Philosophy"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"},
        {subjectID: "PLU8014", name: "Academic Writing"},
        {subjectID: "TDT4120", name: "Algorithms and Data Structures"},
        {subjectID: "TDT4137", name: "Cognitive Architecture"},
        {subjectID: "TDT4140", name: "Software Engineering"},
        {subjectID: "TDT4145", name: "Data Modelling, Databases and Database Management Systems"},
        {subjectID: "TDT4237", name: "Software Security"},
        {subjectID: "TDT4265", name: "Computer Vision"},
        {subjectID: "TFY4280", name: "Signal Processing"},
    ];

    var clickedCourses = [];

    var onCourseChange =  function (c) {
        clickedCourses.push(c);
    }

    const wrapper = shallow(<Home courses={courses}
                                  onCourseChange={onCourseChange} />);

    wrapper.find('Button').forEach(function (node) {
        node.simulate('click', { button: 0 });
    });

    global.expect(clickedCourses.length).toEqual(courses.length);
});

it('renders message when there are no courses', () => {
    var courses = [];
    const wrapper = shallow(<Home courses={courses}/>);

    expect(wrapper.find('.noCourses').exists()).to.equal(true);
});

it('does not renders message when there are no courses', () => {
    var courses = [
        {subjectID: "FI1104", name: "20th Century Philosophy"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"}
    ];
    const wrapper = shallow(<Home courses={courses}/>);

    expect(wrapper.find('.noCourses').exists()).to.equal(false);
});
