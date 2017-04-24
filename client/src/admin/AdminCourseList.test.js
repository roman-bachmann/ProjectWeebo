import React from 'react';
import { shallow } from 'enzyme';
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
        {subjectID: "TDT4137", name: "Cognitive Architecture"},
        {subjectID: "TDT4140", name: "Software Engineering"},
        {subjectID: "TDT4145", name: "Data Modelling, Databases and Database Management Systems"},
        {subjectID: "TDT4237", name: "Software Security"},
        {subjectID: "TDT4265", name: "Computer Vision"},
        {subjectID: "TFY4280", name: "Signal Processing"},
    ];

    const wrapper = shallow(<AdminCourseList courses={courses} />);

    for (var i in courses) {
        const n = (<th>{courses[i].name}</th>);
        expect(wrapper.contains(n)).toEqual(true);
    }
});
