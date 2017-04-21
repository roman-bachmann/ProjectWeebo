import React from 'react';
import { shallow } from 'enzyme';
import Admin from './Admin';

it('renders without crashing', () => {
    shallow(<Admin />);
});
