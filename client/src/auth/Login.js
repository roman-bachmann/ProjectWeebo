import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from './AuthService.js'
// import styles from './styles.module.css'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <h2>Welcome to Weebo!</h2>
        This could act as a welcome page.
        <div>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Log In or Sign Up now!</Button>
        </div>
      </div>
    )
  }
}

export default Login;
