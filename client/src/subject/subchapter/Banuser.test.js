import React from 'react';
import { shallow } from 'enzyme';
import Banuser from './Banuser';

it('renders without crashing', () => {
    shallow(<Banuser/>);
});
