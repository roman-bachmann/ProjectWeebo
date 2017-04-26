import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import SubChapterContent from './SubChapterContent';

it('renders without crashing', () => {
    const subject = {};
    const chapter = {};
    const subchapter = {};
    const needActive = "";
    const activePanel = "";
    const userID = "";
    const auth = {};
    const bantime = new Date();
    const profile = {};

    shallow(<SubChapterContent subject={subject}
                               chapter={chapter}
                               subchapter={subchapter}
                               needActive={needActive}
                               activePanel={activePanel}
                               userID={userID}
                               auth={auth}
                               bantime={bantime}
                               profile={profile} />);
});

it('calls componentWillMount', () => {
    sinon.spy(SubChapterContent.prototype, 'componentWillMount');

    const subject = {};
    const chapter = {};
    const subchapter = {};
    const needActive = "";
    const activePanel = "";
    const userID = "";
    const auth = {};
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    expect(SubChapterContent.prototype.componentWillMount.calledOnce).to.equal(true);
});

it('calls componentWillReceiveProps', () => {
    sinon.spy(SubChapterContent.prototype, 'componentWillReceiveProps');

    const subject = {};
    const chapter = {};
    const subchapter = {};
    const needActive = "";
    const activePanel = "";
    const userID = "";
    const auth = {};
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    wrapper.setProps({ userID: "foo" });
    expect(SubChapterContent.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
});

it('allows us to set props', () => {
    const subject = {};
    const chapter = {};
    const subchapter = {};
    const needActive = "";
    const activePanel = "";
    const userID = "npmTestUser";
    const auth = {};
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    expect(wrapper.props().userID).to.equal("npmTestUser");
    wrapper.setProps({ userID: "foo" });
    expect(wrapper.props().userID).to.equal("foo");
});

it('can find recommend button for admins', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "needActiveText";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return true;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 1,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.find('.btnStar_Recommended').length).to.equal(1);
    expect(wrapper.find('.btnStar_Recommend').length).to.equal(0);
});

it('can find recommend button for professors', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "needActiveText";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return false;},
        isProfessor: function () {return true;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 1,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.find('.btnStar_Recommended').length).to.equal(1);
    expect(wrapper.find('.btnStar_Recommend').length).to.equal(0);
});

it('cannot find recommend button for studasses', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "needActiveText";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return false;},
        isProfessor: function () {return false;},
        isStudass: function () {return true;}
    };
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 1,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.find('.btnStar_Recommended').length).to.equal(0);
    expect(wrapper.find('.btnStar_Recommend').length).to.equal(0);
});

it('cannot find recommend button for students', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "needActiveText";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return false;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 1,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.find('.btnStar_Recommended').length).to.equal(0);
    expect(wrapper.find('.btnStar_Recommend').length).to.equal(0);
});

it('can recommend', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "needActiveText";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return true;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 0,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.find('.btnStar_Recommended').length).to.equal(0);
    expect(wrapper.find('.btnStar_Recommend').length).to.equal(1);

    wrapper.find('.btnStar_Recommend').simulate('click', { button: 0 });
});

it('can unrecommend', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "needActiveText";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return true;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const profile = {};

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 1,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.find('.btnStar_Recommended').length).to.equal(1);
    expect(wrapper.find('.btnStar_Recommend').length).to.equal(0);

    wrapper.find('.btnStar_Recommended').simulate('click', { button: 0 });
});

it('can click video tab', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "video";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return true;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const profile = {
        user_metadata: {
            first_name: "First",
            last_name: "Last"
        }
    };

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 1,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.state('discussColor')).to.equal("#fcfdff");
    expect(wrapper.state('videoColor')).to.equal("#d1d2d3");
    expect(wrapper.state('videoActive')).to.equal("video");

    wrapper.find('.discussPanelBtn').simulate('click', { button: 0 });

    expect(wrapper.state('discussColor')).to.equal("#d1d2d3");
    expect(wrapper.state('videoColor')).to.equal("#fcfdff");
    expect(wrapper.state('videoActive')).to.equal(null);

    wrapper.find('.videoPanelBtn').simulate('click', { button: 0 });

    expect(wrapper.state('discussColor')).to.equal("#fcfdff");
    expect(wrapper.state('videoColor')).to.equal("#d1d2d3");
    expect(wrapper.state('videoActive')).to.equal("video");
});

it('can leave a comment', () => {
    const subject = {subjectID: "MOL8010", name: "Advanced Cellular Imaging Techniques", ban_time: "0000-00-00 00:00:00"};
    const chapter = {chapterID: 100, cname: "Chapter 0"};
    const subchapter = {subChapterID: 200, sname: "Subchapter 0"};
    const needActive = "video";
    const activePanel = "video";
    const userID = "npmTestUser";
    const auth = {
        isAdmin: function () {return true;},
        isProfessor: function () {return false;},
        isStudass: function () {return false;}
    };
    const bantime = new Date();
    const profile = {
        user_metadata: {
            first_name: "First",
            last_name: "Last"
        }
    };

    const wrapper = mount(<SubChapterContent subject={subject}
                                             chapter={chapter}
                                             subchapter={subchapter}
                                             needActive={needActive}
                                             activePanel={activePanel}
                                             userID={userID}
                                             auth={auth}
                                             bantime={bantime}
                                             profile={profile} />);

    const videos = [{
        videoID: "ZYooh1LxB80",
        subChapterVideoID: 171,
        Description: "adsadfsafds",
        userID: "auth0|58bef3f7b5d0e06a490a5df7",
        Favorite: 1,
        addDate: "2017-04-21T09:18:43.000Z",
        fullName: "Alfrodo Baggins",
        role: "student",
        userGravatar: "https://s.gravatar.com/avatar/2772e6f89e71a29fe98afee9103570f0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffr.png",
        votes: 0
    }];

    wrapper.setState({ videoActive: "video"});
    wrapper.setState({ videos: videos });
    wrapper.update();

    expect(wrapper.state('discussColor')).to.equal("#fcfdff");
    expect(wrapper.state('videoColor')).to.equal("#d1d2d3");
    expect(wrapper.state('videoActive')).to.equal("video");

    wrapper.find('.discussPanelBtn').simulate('click', { button: 0 });

    expect(wrapper.state('discussColor')).to.equal("#d1d2d3");
    expect(wrapper.state('videoColor')).to.equal("#fcfdff");
    expect(wrapper.state('videoActive')).to.equal(null);

    wrapper.setState({ comment: "testComment" });
    expect(wrapper.state('comment')).to.equal("testComment");
    wrapper.find('.sendCommentBtn').first().simulate('click', { button: 0 });
    expect(wrapper.state('comment')).to.equal("");

    wrapper.find('FormControl').simulate('change', {target: {value: 'new'}});
    expect(wrapper.state('comment')).to.equal("new");
    wrapper.find('.sendCommentBtn').first().simulate('click', { button: 0 });
    expect(wrapper.state('comment')).to.equal("");
});
