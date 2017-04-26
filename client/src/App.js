import React from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
var NavBar = require('./navbar/NavBar.js');
import Footer from './footer/Footer.js';
import Client from './Client';
import Alert from 'react-s-alert';
import './notification/s-alert-default.css';
import './notification/slide.css';

/**
 * Top level component that hosts a navigation bar on top of all pages that can
 * be displayed underneath it.
 */
export class App extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            userID: {},
            courses: [{}],
            selectedCourse: {},
            profile: {}
        }

        this.changeSelectedCourse = this.changeSelectedCourse.bind(this)

        // Listen to profile_updated events to update internal state
        props.route.auth.on('profile_updated', (newProfile) => {
            this.handleUserChange(newProfile.user_id);
            this.setState({ profile: newProfile });
        })
    }

    componentWillMount() {
        var auth = this.props.route.auth;
        if (auth.getProfile()) {
            this.handleUserChange(auth.getProfile().user_id);
            this.setState({ profile: auth.getProfile() });
        }
    }

    handleUserChange(userID) {
        this.setState({ userID: userID });
        this.handleCourses(userID);
    }

    handleCourses(userID) {
        Client.getCoursesForUser(userID, (crs) => {
            this.setState({
                courses: crs
            });
        });
    }

    changeSelectedCourse(newSelectedCourse) {
        this.setState({
            selectedCourse: newSelectedCourse
        });
    }

    render () {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                selectedCourse: this.state.selectedCourse,
                auth: this.props.route.auth,
                userID: this.state.userID,
                courses: this.state.courses,
                onCourseChange: this.changeSelectedCourse,
                onCourseAdd: this.handleCourses.bind(this),
                profile: this.state.profile
            })
        );

        return (
            <div>
                <NavBar
                    courses={this.state.courses}
                    onCourseChange={this.changeSelectedCourse}
                    auth={this.props.route.auth}
                    userID={this.state.userID}
                    onCourseAdd={this.handleCourses.bind(this)}
                    profile={this.state.profile} />

                <div className="App">
                    {childrenWithProps}
                </div>

                <Footer auth={this.props.route.auth} />
                <Alert stack={{limit: 3}} />
            </div>
        );
    }
}

export default App;
