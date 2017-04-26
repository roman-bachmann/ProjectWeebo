import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ChapterView from './ChapterView';
import EditChaptersModal from './EditChaptersModal';

it('renders without crashing', () => {
    const selectedCourse = { subjectID: "", name: "" };
    const userID = "";
    const auth = {
        canEditChapters: function () {}
    };
    const profile = {};


    shallow(<ChapterView selectedCourse={selectedCourse}
                         userID={userID}
                         auth={auth}
                         profile={profile} />);
});

it('can open modal', () => {
    const selectedCourse = { subjectID: "TDT4120", name: "Algorithms and Data Structures" };
    const userID = "npmTestUser";
    const auth = {
        canEditChapters: function () {return true;}
    };
    const profile = {};


    const wrapper = shallow(<ChapterView selectedCourse={selectedCourse}
                                         userID={userID}
                                         auth={auth}
                                         profile={profile} />);
    //wrapper.find(EditChaptersModal).render();

    expect(wrapper.state('showEditChaptersModal')).to.equal(false);
    wrapper.find('.editChaptersButton').first().simulate('click', { button: 0 });
    expect(wrapper.state('showEditChaptersModal')).to.equal(true);

    //expect(wrapper.find(EditChaptersModal).render().find('.modalbody')).to.have.length(1);
});

it('calls componentWillMount', () => {
    sinon.spy(ChapterView.prototype, 'componentWillMount');

    const selectedCourse = { subjectID: "TDT4120", name: "Algorithms and Data Structures" };
    const userID = "npmTestUser";
    const auth = {
        canEditChapters: function () {return true;}
    };
    const profile = {};


    const wrapper = mount(<ChapterView selectedCourse={selectedCourse}
                                       userID={userID}
                                       auth={auth}
                                       profile={profile} />);

    expect(ChapterView.prototype.componentWillMount.calledOnce).to.equal(true);
});

it('calls componentWillReceiveProps', () => {
    sinon.spy(ChapterView.prototype, 'componentWillReceiveProps');

    const selectedCourse = { subjectID: "TDT4120", name: "Algorithms and Data Structures" };
    const userID = "npmTestUser";
    const auth = {
        canEditChapters: function () {return true;}
    };
    const profile = {};

    const wrapper = mount(<ChapterView selectedCourse={selectedCourse}
                                       userID={userID}
                                       auth={auth}
                                       profile={profile} />);

    wrapper.setProps({ userID: "foo" });
    expect(ChapterView.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
});

it('allows us to set props', () => {
    const selectedCourse = { subjectID: "TDT4120", name: "Algorithms and Data Structures" };
    const userID = "npmTestUser";
    const auth = {
        canEditChapters: function () {return true;}
    };
    const profile = {};

    const wrapper = mount(<ChapterView selectedCourse={selectedCourse}
                                       userID={userID}
                                       auth={auth}
                                       profile={profile} />);

    expect(wrapper.props().userID).to.equal("npmTestUser");
    wrapper.setProps({ userID: "foo" });
    expect(wrapper.props().userID).to.equal("foo");
});

it('can select chapters', () => {
    const selectedCourse = { subjectID: "TDT4120", name: "Algorithms and Data Structures" };
    const userID = "npmTestUser";
    const auth = {
        canEditChapters: function () {return true;}
    };
    const profile = {};

    const wrapper = mount(<ChapterView selectedCourse={selectedCourse}
                                       userID={userID}
                                       auth={auth}
                                       profile={profile} />);

    const chapters = [
        {chapterID: 58, cname: "chapter 0"},
        {chapterID: 60, cname: "chapter 1"},
        {chapterID: 62, cname: "chapter 2"}
    ];

    wrapper.setState({ chapters: chapters });
    wrapper.update();
    expect(wrapper.state().chapters).to.equal(chapters);

    console.log(wrapper.find('NavItem').first().length);
    wrapper.find('NavItem').first().simulate('select');
    expect(wrapper.state().activeTab).to.equal("chap0");
});
