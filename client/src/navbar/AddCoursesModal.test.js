import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import AddCoursesModal from './AddCoursesModal';

it('renders without crashing', () => {
    const userID = "";
    const onCourseAdd = function (id) {};

    shallow(<AddCoursesModal userID={userID}
                             onCourseAdd={onCourseAdd} />);
});

it('calls componentWillMount', () => {
    sinon.spy(AddCoursesModal.prototype, 'componentWillMount');

    const userID = "";
    const onCourseAdd = function (id) {};

    const wrapper = mount(<AddCoursesModal userID={userID}
                                           onCourseAdd={onCourseAdd} />);

    expect(AddCoursesModal.prototype.componentWillMount.calledOnce).to.equal(true);
});

it('allows us to set props', () => {
    const userID = "npmTestUser";
    const onCourseAdd = function (id) {};

    const wrapper = mount(<AddCoursesModal userID={userID}
                                           onCourseAdd={onCourseAdd} />);

    expect(wrapper.props().userID).to.equal("npmTestUser");
    wrapper.setProps({ userID: "foo" });
    expect(wrapper.props().userID).to.equal("foo");
});

it('can write courses in field', () => {
    const userID = "npmTestUser";
    var courseAdded = false;
    const onCourseAdd = function (id) {
        courseAdded = true;
    };
    const show = true;
    const onHide = function () {}

    const wrapper = shallow(<AddCoursesModal userID={userID}
                                             onCourseAdd={onCourseAdd}
                                             show={show}
                                             onHide={onHide} />);

    var courseOptions = [
        {subjectID: "FI1104", name: "20th Century Philosophy"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"},
        {subjectID: "PLU8014", name: "Academic Writing"},
        {subjectID: "TDT4120", name: "Algorithms and Data Structures"},
        {subjectID: "TDT4137", name: "Cognitive Architecture"}
    ];

    wrapper.setState({ courseOptions: courseOptions});
    wrapper.update();

    var selectedCourses = [
        {subjectID: "FI1104", name: "20th Century Philosophy"},
        {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques"}
    ];
    wrapper.setState({ selectedCourses: selectedCourses });
    expect(wrapper.state('selectedCourses')).to.equal(selectedCourses);
});
