import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Upvote from './Upvote';

it('renders without crashing', () => {
    const videoid = "";
    const userID = "";

    shallow(<Upvote videoid={videoid} userID={userID}/>);
});

it('can upvote, cannot upvote twice, cannot downvote', () => {
    const videoid = "testVideo";
    const userID = "npmTestUser";

    const wrapper = shallow(<Upvote videoid={videoid} userID={userID}/>);

    global.expect(wrapper.state('votes')).toEqual(0);
    global.expect(wrapper.state('containsUser')).toEqual(false);
    global.expect(wrapper.state('bgUp')).toEqual("#efefef");

    // Upvote once. Has effect.
    wrapper.find('.upvoteBtn').first().simulate('click', { button: 0 });

    global.expect(wrapper.state('votes')).toEqual(1);
    global.expect(wrapper.state('containsUser')).toEqual(true);
    global.expect(wrapper.state('bgUp')).toEqual('#7f7c7c');

    // Try to upvote twice. No effect.
    wrapper.find('.upvoteBtn').first().simulate('click', { button: 0 });

    global.expect(wrapper.state('votes')).toEqual(1);
    global.expect(wrapper.state('containsUser')).toEqual(true);
    global.expect(wrapper.state('bgUp')).toEqual("#7f7c7c");

    // Try to downvote. No effect.
    wrapper.find('.downvoteBtn').first().simulate('click', { button: 0 });

    global.expect(wrapper.state('votes')).toEqual(1);
    global.expect(wrapper.state('containsUser')).toEqual(true);
    global.expect(wrapper.state('bgUp')).toEqual("#7f7c7c");
});

it('can downvote, cannot downvote twice, cannot upvote', () => {
    const videoid = "testVideo";
    const userID = "npmTestUser";

    const wrapper = shallow(<Upvote videoid={videoid} userID={userID}/>);

    global.expect(wrapper.state('votes')).toEqual(0);
    global.expect(wrapper.state('containsUser')).toEqual(false);
    global.expect(wrapper.state('bgDown')).toEqual("#efefef");

    // Upvote once. Has effect.
    wrapper.find('.downvoteBtn').first().simulate('click', { button: 0 });

    global.expect(wrapper.state('votes')).toEqual(-1);
    global.expect(wrapper.state('containsUser')).toEqual(true);
    global.expect(wrapper.state('bgDown')).toEqual('#7f7c7c');

    // Try to upvote twice. No effect.
    wrapper.find('.downvoteBtn').first().simulate('click', { button: 0 });

    global.expect(wrapper.state('votes')).toEqual(-1);
    global.expect(wrapper.state('containsUser')).toEqual(true);
    global.expect(wrapper.state('bgDown')).toEqual("#7f7c7c");

    // Try to downvote. No effect.
    wrapper.find('.upvoteBtn').first().simulate('click', { button: 0 });

    global.expect(wrapper.state('votes')).toEqual(-1);
    global.expect(wrapper.state('containsUser')).toEqual(true);
    global.expect(wrapper.state('bgDown')).toEqual("#7f7c7c");
});

it('calls componentWillMount', () => {
    sinon.spy(Upvote.prototype, 'componentWillMount');

    const videoid = "testVideo";
    const userID = "npmTestUser";

    const wrapper = shallow(<Upvote videoid={videoid} userID={userID}/>);

    expect(Upvote.prototype.componentWillMount.calledOnce).to.equal(true);
});

it('calls componentWillReceiveProps', () => {
    sinon.spy(Upvote.prototype, 'componentWillReceiveProps');

    const videoid = "testVideo";
    const userID = "npmTestUser";

    const wrapper = shallow(<Upvote videoid={videoid} userID={userID}/>);

    wrapper.setProps({ videoid: "foo" });
    expect(Upvote.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
});

it('allows us to set props', () => {
    const videoid = "testVideo";
    const userID = "npmTestUser";

    const wrapper = mount(<Upvote videoid={videoid} userID={userID}/>);

    expect(wrapper.props().videoid).to.equal("testVideo");
    wrapper.setProps({ videoid: "foo" });
    expect(wrapper.props().videoid).to.equal("foo");
});
