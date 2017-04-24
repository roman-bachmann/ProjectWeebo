import React from 'react';
import { shallow } from 'enzyme';
import ProfileDetails from './ProfileDetails';

it('renders without crashing', () => {
    const profile = {
        user_metadata: {
            first_name: "Foo",
            last_name: "Bar"
        }
    }
    shallow(<ProfileDetails profile={profile}/>);
});
