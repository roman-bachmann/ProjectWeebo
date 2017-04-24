import React from 'react';
import { shallow } from 'enzyme';
import Unauthorized from './Unauthorized';

it('renders without crashing', () => {
    shallow(<Unauthorized />);
});
