import React from 'react';
import { shallow } from 'enzyme';
import ProfileDetails from './ProfileDetails';

it('renders without crashing', () => {
    shallow(<ProfileDetails/>);
});
