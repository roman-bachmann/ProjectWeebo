import React from 'react';
import { shallow } from 'enzyme';
import Routes from './Routes.js';

it('renders without crashing', () => {
  shallow(<Routes />);
});
