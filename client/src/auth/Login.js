import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from './AuthService.js'
import './Login.css'
// import styles from './styles.module.css'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props.route
    return (
            <div className="LogInBody">

                <div className="LogInBox">
                  <h2>W</h2>

                  <div className="LogIn"><Button bsStyle="primary" onClick={auth.login.bind(this)}>Log In / Sign Up</Button></div>
                </div>
          </div>
    )
  }
}

export default Login;
