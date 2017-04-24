import React from 'react';
import { shallow } from 'enzyme';
import ChapterView from './ChapterView';

it('renders without crashing', () => {
    shallow(<ChapterView/>);
});
