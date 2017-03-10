import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from './auth/AuthService.js'
import {Link} from 'react-router';
import './Home.css'

export class Home extends React.Component {
    static contextTypes = {
        router: T.object
    }

    static propTypes = {
        auth: T.instanceOf(AuthService)
    }

    logout() {
        // destroys the session data
        this.props.auth.logout()
        // redirects to login page
        this.context.router.push('/login');
    }

    render() {
        return (
          <div>
            <div className="title">
                <h1>Home</h1>
            </div>
            <div className="content">
              <div className="inner">
                <p>
                    “Perhaps home is not a place but simply an irrevocable condition.”
                    ― James Baldwin, Giovannis Room
                </p>
                <Link to="/learn">Learn now!</Link>
              </div>
            </div>
          </div>
        )
    }
}

export default Home;
