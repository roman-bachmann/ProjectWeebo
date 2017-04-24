import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Footer from './Footer';

it('renders without crashing', () => {
    var auth = {
        isAdmin: function () {
            return false;
        },
        logout: function () {
            return false;
        }
    };
    shallow(<Footer auth={auth} />);
});


it('can find all normal links', () => {
    var auth = {
        isAdmin: function() {
            return false;
        },
        logout: function () {
            return false;
        }
    };

    const wrapper = shallow(<Footer auth={auth}/>);

    expect(wrapper.find('a')).to.have.length(3);
});

it('can find all Link links for non-admins', () => {
    var auth = {
        isAdmin: function() {
            return false;
        },
        logout: function () {
            return false;
        }
    };

    const wrapper = shallow(<Footer auth={auth}/>);

    expect(wrapper.find('Link')).to.have.length(5);
});

it('can find all Link links for admins', () => {
    var auth = {
        isAdmin: function() {
            return true;
        },
        logout: function () {
            return false;
        }
    };

    const wrapper = shallow(<Footer auth={auth}/>);

    expect(wrapper.find('Link')).to.have.length(6);
});
