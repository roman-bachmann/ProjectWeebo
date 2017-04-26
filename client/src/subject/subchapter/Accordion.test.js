import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Accordion from './Accordion';

it('renders without crashing', () => {
    const subject = {};
    const chapter = {};
    const chapId = "chap0";
    const userID = "";
    const auth = {
        canEditChapters: function () {}
    };
    const profile = {};

    shallow(<Accordion subject={subject}
                       chapter={chapter}
                       chapId={chapId}
                       userID={userID}
                       auth={auth}
                       profile={profile} />);
});

it('calls componentWillMount', () => {
    sinon.spy(Accordion.prototype, 'componentWillMount');

    const subject = {};
    const chapter = {};
    const chapId = "chap0";
    const userID = "";
    const auth = {
        canEditChapters: function () {}
    };
    const profile = {};
    const wrapper = mount(<Accordion subject={subject}
                       chapter={chapter}
                       chapId={chapId}
                       userID={userID}
                       auth={auth}
                       profile={profile} />);
    expect(Accordion.prototype.componentWillMount.calledOnce).to.equal(true);
});

it('calls componentWillReceiveProps', () => {
    sinon.spy(Accordion.prototype, 'componentWillReceiveProps');

    const subject = {};
    const chapter = {};
    const chapId = "chap0";
    const userID = "user0";
    const auth = {
        canEditChapters: function () {}
    };
    const profile = {};
    const wrapper = mount(<Accordion subject={subject}
                       chapter={chapter}
                       chapId={chapId}
                       userID={userID}
                       auth={auth}
                       profile={profile} />);
    wrapper.setProps({ userID: "foo" });
    expect(Accordion.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
});

it('allows us to set props', () => {
    const subject = {};
    const chapter = {};
    const chapId = "chap0";
    const userID = "user0";
    const auth = {
        canEditChapters: function () {}
    };
    const profile = {};
    const wrapper = mount(<Accordion subject={subject}
                       chapter={chapter}
                       chapId={chapId}
                       userID={userID}
                       auth={auth}
                       profile={profile} />);

    expect(wrapper.props().userID).to.equal("user0");
    wrapper.setProps({ userID: "foo" });
    expect(wrapper.props().userID).to.equal("foo");
});

it('can open modal', () => {
    const subject = {
        subjectID: "TDT4120",
        name: "Algorithms and Data Structures",
        ban_time: "0000-00-00 00:00:00"
    };
    const chapter = {chapterID: 1, cname: "Algorithms and problems"};
    const chapId = "chap0";
    const userID = "npmTestUser";
    const auth = {
        canEditChapters: function () {return true;}
    };
    const profile = {};

    const wrapper = shallow(<Accordion subject={subject}
                                       chapter={chapter}
                                       chapId={chapId}
                                       userID={userID}
                                       auth={auth}
                                       profile={profile} />);

    expect(wrapper.state('showEditSubChaptersModal')).to.equal(false);
    wrapper.find('.editSubChaptersButton').first().simulate('click', { button: 0 });
    expect(wrapper.state('showEditSubChaptersModal')).to.equal(true);
});

it('creates right subchapters', () => {
    const subject = {
        subjectID: "TDT4120",
        name: "Algorithms and Data Structures",
        ban_time: "0000-00-00 00:00:00"
    };
    const chapter = {chapterID: 1, cname: "Algorithms and problems"};
    const chapId = "chap0";
    const userID = "npmTestUser";
    const auth = {
        canEditChapters: function () {return true;}
    };
    const profile = {};

    const wrapper = shallow(<Accordion subject={subject}
                                       chapter={chapter}
                                       chapId={chapId}
                                       userID={userID}
                                       auth={auth}
                                       profile={profile} />);

    const subchapters = [
        {subChapterID: 22, sname: "subc1"},
        {subChapterID: 32, sname: "subc2"},
        {subChapterID: 33, sname: "subc3"}
    ];

    wrapper.setState({ subchapters: subchapters });
    wrapper.update();
});
