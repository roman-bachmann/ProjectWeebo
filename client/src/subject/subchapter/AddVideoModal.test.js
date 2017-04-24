import React from 'react';
import { shallow } from 'enzyme';
import AddVideoModal from './AddVideoModal';

it('renders without crashing', () => {
    shallow(<AddVideoModal/>);
});
