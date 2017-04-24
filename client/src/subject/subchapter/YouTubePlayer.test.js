import React from 'react';
import { shallow } from 'enzyme';
import YouTubePlayer from './YouTubePlayer';

it('renders without crashing', () => {
    shallow(<YouTubePlayer/>);
});
