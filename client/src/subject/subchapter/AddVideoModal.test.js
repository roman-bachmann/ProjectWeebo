import React from 'react';
import { shallow } from 'enzyme';
import AddVideoModal from './AddVideoModal';

it('renders without crashing', () => {
    // <VideoModal
    //     show={this.state.showCourseModal}
    //     onHide={closeCourseModal}
    //     subject={this.props.subject.subjectID}
    //     chapter={this.props.chapter.chapterID}
    //     subchapter={this.props.subchapter.subChapterID}
    //     userID={this.props.userID}
    //     auth={this.props.auth}
    //     bantime={this.props.bantime}
    //     reloadOnSubmit={this.triggerReloadVideos}
    //     profile={this.props.profile}/>

    const show = false;
    const onHide = function () {};
    const subject = "";
    const chapter = "";
    const subchapter = "";
    const userID = "";
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
