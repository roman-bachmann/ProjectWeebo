import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import EditSubChaptersModal from './EditSubChaptersModal';

it('renders without crashing', () => {
    const show = true;
    const onHide = function () {};
    const subjectID = "";
    const chapterID = "";
    const reloadSubChapters = function () {};
    const subchapters = [{}];

    shallow(<EditSubChaptersModal show={show}
                                  onHide={onHide}
                                  subjectID={subjectID}
                                  chapterID={chapterID}
                                  reloadSubChapters={reloadSubChapters}
                                  subchapters={subchapters} />);
});

it('allows us to set props', () => {
    const show = true;
    const onHide = function () {};
    const subjectID = "subID";
    const chapterID = "";
    const reloadSubChapters = function () {};
    const subchapters = [{}];

    const wrapper = mount(<EditSubChaptersModal show={show}
                                                  onHide={onHide}
                                                  subjectID={subjectID}
                                                  chapterID={chapterID}
                                                  reloadSubChapters={reloadSubChapters}
                                                  subchapters={subchapters} />);

    expect(wrapper.props().subjectID).to.equal("subID");
    wrapper.setProps({ subjectID: "foo" });
    expect(wrapper.props().subjectID).to.equal("foo");
});

it('can open modal and abort', () => {
    const show = true;
    const onHide = function () {};
    const subjectID = "subID";
    const chapterID = "";
    const reloadSubChapters = function () {};
    const subchapters = [
        {subChapterID: 22, sname: "sub0"},
        {subChapterID: 32, sname: "sub1"},
        {subChapterID: 33, sname: "sub2"}
    ];

    const wrapper = shallow(<EditSubChaptersModal show={show}
                                                  onHide={onHide}
                                                  subjectID={subjectID}
                                                  chapterID={chapterID}
                                                  reloadSubChapters={reloadSubChapters}
                                                  subchapters={subchapters} />);

    expect(wrapper.state('showDeleteModal')).to.equal(false);
    wrapper.find('.editSubChaptersDeleteModalButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(true);
    wrapper.update()

    wrapper.find('.abortButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(false);
});

it('can open modal and delete subchapter', () => {
    const show = true;
    const onHide = function () {};
    const subjectID = "subID";
    const chapterID = "";
    const reloadSubChapters = function () {};
    const subchapters = [
        {subChapterID: 22, sname: "sub0"},
        {subChapterID: 32, sname: "sub1"},
        {subChapterID: 33, sname: "sub2"}
    ];

    const wrapper = shallow(<EditSubChaptersModal show={show}
                                                  onHide={onHide}
                                                  subjectID={subjectID}
                                                  chapterID={chapterID}
                                                  reloadSubChapters={reloadSubChapters}
                                                  subchapters={subchapters} />);

    expect(wrapper.state('showDeleteModal')).to.equal(false);
    wrapper.find('.editSubChaptersDeleteModalButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(true);
    wrapper.update()

    wrapper.find('.deleteButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(false);
});

it('can open modal and add subchapter', () => {
    const show = true;
    const onHide = function () {};
    const subjectID = "subID";
    const chapterID = "";
    const reloadSubChapters = function () {};
    const subchapters = [
        {subChapterID: 22, sname: "sub0"},
        {subChapterID: 32, sname: "sub1"},
        {subChapterID: 33, sname: "sub2"}
    ];

    const wrapper = shallow(<EditSubChaptersModal show={show}
                                                  onHide={onHide}
                                                  subjectID={subjectID}
                                                  chapterID={chapterID}
                                                  reloadSubChapters={reloadSubChapters}
                                                  subchapters={subchapters} />);

    expect(wrapper.state('showDeleteModal')).to.equal(false);
    wrapper.find('.editSubChaptersDeleteModalButton0').first().simulate('click', { button: 0 });
    expect(wrapper.state('showDeleteModal')).to.equal(true);
    wrapper.update()

    wrapper.setState({ newSubChapterName: "newSubChapter" });
    expect(wrapper.state('newSubChapterName')).to.equal("newSubChapter");
    wrapper.find('.submitSubChapter').first().simulate('click', { button: 0 });
    expect(wrapper.state('newSubChapterName')).to.equal("");

    wrapper.find('FormControl').simulate('change', {target: {value: 'new'}});
    expect(wrapper.state('newSubChapterName')).to.equal("new");
    wrapper.find('FormControl').simulate('focus');
    wrapper.find('FormControl').simulate('keyPress', {key: 'Enter'});
});
