import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import EditChaptersModal from './EditChaptersModal';

it('renders without crashing', () => {
    const subjectID = "";
    const chapters = [{}];
    const reloadChapters = function (id) {}

    shallow(<EditChaptersModal subjectID={subjectID}
                               chapters={chapters}
                               reloadChapter={reloadChapters} />);
});

it('allows us to set props', () => {
    const subjectID = "subID";
    const chapters = [{}];
    const reloadChapters = function (id) {}

    const wrapper = mount(<EditChaptersModal subjectID={subjectID}
                                             chapters={chapters}
                                             reloadChapter={reloadChapters} />);

    expect(wrapper.props().subjectID).to.equal("subID");
    wrapper.setProps({ subjectID: "foo" });
    expect(wrapper.props().subjectID).to.equal("foo");
});

it('can open modal and abort', () => {
    const subjectID = "subID";
    const chapters = [
        {chapterID: 58, cname: "chapter 0"},
        {chapterID: 60, cname: "chapter 1"},
        {chapterID: 62, cname: "chapter 2"}
    ];
    const reloadChapters = function (id) {}
    const show = true;
    const onHide = function () {}

    const wrapper = shallow(<EditChaptersModal subjectID={subjectID}
                                             chapters={chapters}
                                             reloadChapter={reloadChapters}
                                             show={show}
                                             onHide={onHide} />);

    expect(wrapper.state('showDeleteModal')).to.equal(false);
    wrapper.find('.removeCourseButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(true);
    wrapper.update()

    wrapper.find('.abortButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(false);
});

it('can open modal and delete chapter', () => {
    const subjectID = "subID";
    const chapters = [
        {chapterID: 58, cname: "chapter 0"},
        {chapterID: 60, cname: "chapter 1"},
        {chapterID: 62, cname: "chapter 2"}
    ];
    const reloadChapters = function (id) {}
    const show = true;
    const onHide = function () {}

    const wrapper = shallow(<EditChaptersModal subjectID={subjectID}
                                             chapters={chapters}
                                             reloadChapter={reloadChapters}
                                             show={show}
                                             onHide={onHide} />);

    expect(wrapper.state('showDeleteModal')).to.equal(false);
    wrapper.find('.removeCourseButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(true);
    wrapper.update()

    wrapper.find('.deleteButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(false);
});

it('can open modal and add chapter', () => {
    const subjectID = "subID";
    const chapters = [
        {chapterID: 58, cname: "chapter 0"},
        {chapterID: 60, cname: "chapter 1"},
        {chapterID: 62, cname: "chapter 2"}
    ];
    const reloadChapters = function (id) {}
    const show = true;
    const onHide = function () {}

    const wrapper = shallow(<EditChaptersModal subjectID={subjectID}
                                             chapters={chapters}
                                             reloadChapter={reloadChapters}
                                             show={show}
                                             onHide={onHide} />);

    expect(wrapper.state('showDeleteModal')).to.equal(false);
    wrapper.find('.removeCourseButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(true);
    wrapper.update()

    wrapper.setState({ newChapterName: "newChapter" });
    expect(wrapper.state('newChapterName')).to.equal("newChapter");
    wrapper.find('.submitChapter').first().simulate('click', { button: 0 });
    expect(wrapper.state('newChapterName')).to.equal("");

    wrapper.find('FormControl').simulate('change', {target: {value: 'new'}});
    expect(wrapper.state('newChapterName')).to.equal("new");
    wrapper.find('FormControl').simulate('focus');
    wrapper.find('FormControl').simulate('keyPress', {key: 'Enter'})
});
