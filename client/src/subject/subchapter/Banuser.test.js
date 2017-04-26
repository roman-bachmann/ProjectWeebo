import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Banuser from './Banuser';

it('renders without crashing', () => {
    const userID = "userID";
    const subject = "MOL8010";
    const onHide = function () {};
    const show = true;

    shallow(<Banuser userID={userID}
                     subject={subject}
                     onHide={onHide}
                     show={show} />);
});

it('can abort ban', () => {
    const userID = "userID";
    const subject = "MOL8010";
    var onHideCalled = false;
    const onHide = function () {onHideCalled = true;}
    const show = true;

    const wrapper = shallow(<Banuser userID={userID}
                                   subject={subject}
                                   onHide={onHide}
                                   show={show} />);

    wrapper.find('.closeBtn').simulate('click', { button: 0 });
    expect(onHideCalled).to.equal(true);
});

it('can ban user 1', () => {
    const userID = "userID";
    const subject = "MOL8010";
    var onHideCalled = false;
    const onHide = function () {onHideCalled = true;}
    const show = true;

    const wrapper = shallow(<Banuser userID={userID}
                                   subject={subject}
                                   onHide={onHide}
                                   show={show} />);

    var newDate = new Date();
    newDate.setDate(newDate.getDate() + 10);
    wrapper.setState({ controlledDate: newDate });
    wrapper.setState({ banperiod: 10 });
    expect(wrapper.state('controlledDate')).to.equal(newDate);
    expect(wrapper.state('banperiod')).to.equal(10);

    wrapper.find('.acceptBtn').simulate('click', { button: 0 });
    expect(onHideCalled).to.equal(true);
});
