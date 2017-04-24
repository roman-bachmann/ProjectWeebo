import React from 'react';
import { shallow } from 'enzyme';
import EditChaptersModal from './EditChaptersModal';

it('renders without crashing', () => {
    shallow(<EditChaptersModal/>);
});
