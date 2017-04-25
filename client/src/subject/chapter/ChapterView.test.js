import React from 'react';
import { shallow } from 'enzyme';
import ChapterView from './ChapterView';

it('renders without crashing', () => {
    // this.props.selectedCourse.subjectID
    // userID={this.props.userID}
    // auth={this.props.auth}
    // profile={this.props.profile}/>
    // this.props.selectedCourse.name}

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
