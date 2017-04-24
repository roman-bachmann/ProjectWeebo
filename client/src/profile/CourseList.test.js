import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';

it('renders without crashing', () => {
    const courses = [{}];
    const userID = "user_id";
    shallow(<CourseList courses={courses}
                        userID={userID} />);
});
