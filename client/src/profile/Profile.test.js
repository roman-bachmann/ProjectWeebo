import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import AuthService from '../auth/AuthService.js'
import Profile from './Profile';

it('renders without crashing', () => {
    var profile = {};

    var auth = {
        isAdmin: function () {
            return false;
        },
        logout: function () {
            return false;
        },
        getProfile: function () {
            return profile;
        },
        on: function () {},
        logout: function () {}
    };

    shallow(<Profile auth={auth} />);
});

it('calls on function when profile changes', () => {
    var profile = {
        name: "Tester"
    };

    var profileChanged = false;

    var auth = {
        isAdmin: function () {
            return false;
        },
        logout: function () {
            return false;
        },
        getProfile: function () {
            return profile;
        },
        on: function () {
            profileChanged = true;
        }
    };

    const wrapper = shallow(<Profile auth={auth} />);
    wrapper.simulate('profile_updated', profile);
    global.expect(profileChanged).toEqual(true);
});
