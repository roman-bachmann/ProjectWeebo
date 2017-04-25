import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

it('renders without crashing', () => {
    // <NavBar
    //     courses={this.state.courses}
    //     onCourseChange={this.changeSelectedCourse}
    //     auth={this.props.route.auth}
    //     userID={this.state.userID}
    //     onCourseAdd={this.handleCourses.bind(this)}
    //     profile={this.state.profile} />

    const courses = [{}];
    const onCourseChange = function () {};
    const auth = {
        loggedIn: function () {return true;},
        isAdmin: function () {return true;},
        logout: function () {}
    };
    const userID = "";
    const onCourseAdd = function () {};
    const profile = {};

    shallow(<NavBar courses={courses}
                    onCourseChange={onCourseChange}
                    auth={auth}
                    userID={userID}
                    onCourseAdd={onCourseAdd}
                    profile={profile} />);
});
