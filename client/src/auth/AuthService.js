import Auth0Lock from 'auth0-lock'
import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import { browserHistory } from 'react-router'
import LogoImg from '../img/W.png';

export default class AuthService extends EventEmitter {
    constructor(clientId, domain) {
        super()
        // Configure Auth0
        this.lock = new Auth0Lock(clientId, domain, {
            theme: {
            logo: LogoImg,
            primaryColor: "#8bdab1"
            },

            languageDictionary: {
        title: "Weebo"
      },

            auth: {
                redirectUrl: 'http://localhost:3000/login',
                responseType: 'token'
            },
            additionalSignUpFields: [{
                name: "address",                              // required
                placeholder: "enter your address",            // required
                icon: "http://findicons.com/files/icons/1687/free_web_design/16/home.png", // optional
                validator: function(value) {                  // optional
                    // only accept addresses with more than 10 chars
                    return value.length > 10;
                }
            }]
        })
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this))
            // Add callback for lock `authorization_error` event
            // this.lock.on('authorization_error', this._authorizationError.bind(this)) // TODO: breaks everything...
        // binds login functions to keep this context
        this.login = this.login.bind(this)
    }

    _doAuthentication(authResult) {
        // Saves the user token
        this.setToken(authResult.idToken)
        // navigate to the home route
        browserHistory.replace('/home')
        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error)
            } else {
                this.setProfile(profile)
            }
        })
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show()
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !isTokenExpired(token)
    }

    setToken(idToken) {
        // Saves user token to local storage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from local storage
        return localStorage.getItem('id_token')
    }

    setProfile(profile) {
        // Saves profile data to local storage
        localStorage.setItem('profile', JSON.stringify(profile))
        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile)
    }

    getProfile() {
        // Retrieves the profile data from local storage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    logout() {
        // Clear user token and profile data from local storage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        browserHistory.replace('/home')
    }
}
