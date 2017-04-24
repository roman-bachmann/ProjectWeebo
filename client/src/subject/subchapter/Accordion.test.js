import React from 'react';
import { shallow } from 'enzyme';
import Accordion from './Accordion';

it('renders without crashing', () => {
    shallow(<Accordion/>);
});
