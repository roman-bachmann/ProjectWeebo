import React from 'react';
import { shallow } from 'enzyme';
import AddCoursesModal from './AddCoursesModal';

it('renders without crashing', () => {
    shallow(<AddCoursesModal/>);
});
