import React from 'react';
import { shallow } from 'enzyme';
import Contact from './Contact';

it('renders without crashing', () => {
    shallow(<Contact/>);
});
