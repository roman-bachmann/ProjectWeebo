import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './PageNotFound';
import {Link} from 'react-router'

it('renders without crashing', () => {
    shallow(<PageNotFound/>);
});

it('renders the whole page', () => {
    const wrapper = shallow(<PageNotFound />);

    const notFound = (
        <div className="PageNotFound">
            <h1 className="PageNotFoundTitle">Error 404 - Page not found!</h1>
            <div className="LogoWrap"><h1 className="W_Logo">W</h1></div>
            <Link to={'/home'} className="ReturnHome">Return to Homepage</Link>
        </div>
    );

    expect(wrapper.contains(notFound)).toEqual(true);
});
