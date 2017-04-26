import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import AddCoursesModal from './AddCoursesModal';

it('renders without crashing', () => {
    const userID = "";
    const onCourseAdd = function (id) {};

    shallow(<AddCoursesModal userID={userID}
                             onCourseAdd={onCourseAdd} />);
});

it('can click button', () => {
    const userID = "npmTestUser";
    var courseAdded = false;
    const onCourseAdd = function (id) {
        courseAdded = true;
    };

    const wrapper = shallow(<AddCoursesModal userID={userID}
                                             onCourseAdd={onCourseAdd} />);

    //wrapper.find('.addCoursesBtn').first().simulate('click', { button: 0 });
    //console.log(wrapper.find('.addCoursesBtn').first())

    //global.expect(courseAdded).toEqual(true);
});
