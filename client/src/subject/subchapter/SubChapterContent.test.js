import React from 'react';
import { shallow } from 'enzyme';
import SubChapterContent from './SubChapterContent';

it('renders without crashing', () => {
    // this.props.subject.subjectID,
    // this.props.chapter.chapterID,
    // this.props.subchapter.subChapterID)
    // this.props.needActive
    // this.props.auth.isAdmin() ||
    // this.props.auth.isProfessor() ||
    // this.props.auth.isStudass()
    // var userID = this.props.userID;
 //  	var fullName = this.props.profile.user_metadata.first_name + " " + this.props.profile.user_metadata.last_name;
    // this.props.bantime
    // this.props.activePanel
    // this.props.profile.picture
    // this.props.bantime.getDate()}-{this.props.bantime.getMonth() + 1}-{this.props.bantime.getFullYear()
    //
    //     subject={this.props.subject.subjectID}
    //     chapter={this.props.chapter.chapterID}
    //     subchapter={this.props.subchapter.subChapterID}
    //     userID={this.props.userID}
    //     auth={this.props.auth}
    //     bantime={this.props.bantime}
    //     reloadOnSubmit={this.triggerReloadVideos}
    //     profile={this.props.profile}/>


    shallow(<SubChapterContent />);
});
