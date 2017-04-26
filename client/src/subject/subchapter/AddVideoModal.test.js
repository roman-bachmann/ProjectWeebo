import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import AddVideoModal from './AddVideoModal';

it('renders without crashing', () => {
    const show = true;
    const onHide = function () {};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {};
    const bantime = new Date();
    const reloadOnSubmit = function () {};
    const profile = {};

    shallow(<AddVideoModal show={show}
                           onHide={onHide}
                           subject={subject}
                           chapter={chapter}
                           subchapter={subchapter}
                           userID={userID}
                           auth={auth}
                           bantime={bantime}
                           reloadOnSubmit={reloadOnSubmit}
                           profile={profile} />);
});

it('can validate youtube links', () => {
    const show = true;
    const onHide = function () {};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {};
    const bantime = new Date();
    const reloadOnSubmit = function () {};
    const profile = {};

    const wrapper = shallow(<AddVideoModal show={show}
                                           onHide={onHide}
                                           subject={subject}
                                           chapter={chapter}
                                           subchapter={subchapter}
                                           userID={userID}
                                           auth={auth}
                                           bantime={bantime}
                                           reloadOnSubmit={reloadOnSubmit}
                                           profile={profile} />);

    wrapper.find('.inputLink').first().simulate('change', {target: {value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}});
    expect(wrapper.state('userInput')).to.equal("dQw4w9WgXcQ");

    wrapper.find('.inputLink').first().simulate('change', {target: {value: 'test'}});
    expect(wrapper.state('userInput')).to.equal("test");
});

it('can validate the description', () => {
    const show = true;
    const onHide = function () {};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {};
    const bantime = new Date();
    const reloadOnSubmit = function () {};
    const profile = {};

    const wrapper = shallow(<AddVideoModal show={show}
                                           onHide={onHide}
                                           subject={subject}
                                           chapter={chapter}
                                           subchapter={subchapter}
                                           userID={userID}
                                           auth={auth}
                                           bantime={bantime}
                                           reloadOnSubmit={reloadOnSubmit}
                                           profile={profile} />);

    wrapper.find('.inputLink').first().simulate('change', {target: {value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}});
    expect(wrapper.state('userInput')).to.equal("dQw4w9WgXcQ");

    wrapper.find('textarea').first().simulate('change', {target: {value: 'testDescription'}});
    expect(wrapper.state('description')).to.equal("testDescription");

    wrapper.find('textarea').first().simulate('change', {target: {value: ''}});
    expect(wrapper.state('description')).to.equal("No description.");
});

it('can switch between sharing sites', () => {
    const show = true;
    const onHide = function () {};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {};
    const bantime = new Date();
    const reloadOnSubmit = function () {};
    const profile = {};

    const wrapper = shallow(<AddVideoModal show={show}
                                           onHide={onHide}
                                           subject={subject}
                                           chapter={chapter}
                                           subchapter={subchapter}
                                           userID={userID}
                                           auth={auth}
                                           bantime={bantime}
                                           reloadOnSubmit={reloadOnSubmit}
                                           profile={profile} />);

    // wrapper.find('input[type="radio"]').first().simulate('click');
    // expect(wrapper.state('sharingsite')).to.equal("YouTube");

    // wrapper.find('input[type="radio"]').at(1).simulate('click');
    // expect(wrapper.state('sharingsite')).to.equal("Vimeo");
});

it('can add youtube video as admin', () => {
    const show = true;
    const onHide = function () {};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {
        isAdmin: function () {return true;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const reloadOnSubmit = function () {};
    const profile = {
        user_metadata: {
            first_name: "First",
            last_name: "Name"
        }
    };

    const wrapper = shallow(<AddVideoModal show={show}
                                           onHide={onHide}
                                           subject={subject}
                                           chapter={chapter}
                                           subchapter={subchapter}
                                           userID={userID}
                                           auth={auth}
                                           bantime={bantime}
                                           reloadOnSubmit={reloadOnSubmit}
                                           profile={profile} />);

    wrapper.find('.inputLink').first().simulate('change', {target: {value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}});
    expect(wrapper.state('userInput')).to.equal("dQw4w9WgXcQ");

    wrapper.find('textarea').first().simulate('change', {target: {value: 'testDescription'}});
    expect(wrapper.state('description')).to.equal("testDescription");

    wrapper.find('.acceptBtn').first().simulate('click', { button: 0 });
});

it('can add youtube video as professor', () => {
    const show = true;
    const onHide = function () {};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {
        isAdmin: function () {return false;},
        isProfessor: function () {return true;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const reloadOnSubmit = function () {};
    const profile = {
        user_metadata: {
            first_name: "First",
            last_name: "Name"
        }
    };

    const wrapper = shallow(<AddVideoModal show={show}
                                           onHide={onHide}
                                           subject={subject}
                                           chapter={chapter}
                                           subchapter={subchapter}
                                           userID={userID}
                                           auth={auth}
                                           bantime={bantime}
                                           reloadOnSubmit={reloadOnSubmit}
                                           profile={profile} />);

    wrapper.find('.inputLink').first().simulate('change', {target: {value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}});
    expect(wrapper.state('userInput')).to.equal("dQw4w9WgXcQ");

    wrapper.find('textarea').first().simulate('change', {target: {value: 'testDescription'}});
    expect(wrapper.state('description')).to.equal("testDescription");

    wrapper.find('.acceptBtn').first().simulate('click', { button: 0 });
});

it('can add youtube video as studass', () => {
    const show = true;
    const onHide = function () {};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {
        isAdmin: function () {return false;},
        isProfessor: function () {return false;},
        isStudass: function () {return true;}
    };
    const bantime = new Date();
    const reloadOnSubmit = function () {};
    const profile = {
        user_metadata: {
            first_name: "First",
            last_name: "Name"
        }
    };

    const wrapper = shallow(<AddVideoModal show={show}
                                           onHide={onHide}
                                           subject={subject}
                                           chapter={chapter}
                                           subchapter={subchapter}
                                           userID={userID}
                                           auth={auth}
                                           bantime={bantime}
                                           reloadOnSubmit={reloadOnSubmit}
                                           profile={profile} />);

    wrapper.find('.inputLink').first().simulate('change', {target: {value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}});
    expect(wrapper.state('userInput')).to.equal("dQw4w9WgXcQ");

    wrapper.find('textarea').first().simulate('change', {target: {value: 'testDescription'}});
    expect(wrapper.state('description')).to.equal("testDescription");

    wrapper.find('.acceptBtn').first().simulate('click', { button: 0 });
});

it('does not allow banned user to post', () => {
    const show = true;
    var onHideCalled = false;
    const onHide = function () {onHideCalled = true};
    const subject = "subjectID";
    const chapter = "chapterID";
    const subchapter = "subChapterID";
    const userID = "userID";
    const auth = {
        isAdmin: function () {return false;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date(2020, 1, 1, 1, 1, 1, 1);
    const reloadOnSubmit = function () {};
    const profile = {
        user_metadata: {
            first_name: "First",
            last_name: "Name"
        }
    };

    const wrapper = shallow(<AddVideoModal show={show}
                                           onHide={onHide}
                                           subject={subject}
                                           chapter={chapter}
                                           subchapter={subchapter}
                                           userID={userID}
                                           auth={auth}
                                           bantime={bantime}
                                           reloadOnSubmit={reloadOnSubmit}
                                           profile={profile} />);

    wrapper.find('.inputLink').first().simulate('change', {target: {value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}});
    expect(wrapper.state('userInput')).to.equal("dQw4w9WgXcQ");

    wrapper.find('textarea').first().simulate('change', {target: {value: 'testDescription'}});
    expect(wrapper.state('description')).to.equal("testDescription");

    // this.setState({ target: e.target, show: !this.state.show });
    const oldState = wrapper.state('show');
    wrapper.find('.acceptBtn').first().simulate('click', { button: 0 });
    expect(wrapper.state('show')).to.equal(!oldState);
});
