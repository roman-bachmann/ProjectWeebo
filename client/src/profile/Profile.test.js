import React from 'react';
import { shallow } from 'enzyme';
import AuthService from '../auth/AuthService.js'
import Profile from './Profile';

it('renders without crashing', () => {
    const clientId = 'qMCf6J8kSiuC3T8sM8jBVT92CG2R7sIY';
    const domain = 'weebo.eu.auth0.com';
    const authResult = {accessToken: "MAdelJM-jKWE9brz",
                  idToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJod…zI5fQ.EUvW-AMEI3ykgrEYX3hq-YfzdsYc3CoFm9hXUpqPxXc",
                  idTokenPayload: Object,
                  refreshToken: undefined,
                  state: "NKKgYBwCxNYrHSj1MGhhERbO8FChK9Ru"};

    var auth = new AuthService(clientId, domain);
    auth._doAuthentication(authResult);

    shallow(<Profile auth={auth} />);
});
