import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

it('renders without crashing', () => {
    const route = {
        auth: {
            login: function () {

            }
        }
    }
    shallow(<Login route={route}/>);
});
