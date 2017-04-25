import React from 'react';
import { shallow } from 'enzyme';
import Accordion from './Accordion';

it('renders without crashing', () => {

    // <Accordion
    //     subject={this.props.selectedCourse}
    //     chapter={this.state.chapters[idx]}
    //     chapId={'chap' + idx}
    //     userID={this.props.userID}
    //     auth={this.props.auth}
    //     profile={this.props.profile}/>

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
