import React from 'react';
import { shallow } from 'enzyme';
import AdminAddCourse from './AdminAddCourse';

it('renders without crashing', () => {
    shallow(<AdminAddCourse />);
});
