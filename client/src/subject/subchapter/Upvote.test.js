import React from 'react';
import { shallow } from 'enzyme';
import Upvote from './Upvote';

it('renders without crashing', () => {
    shallow(<Upvote/>);
});
