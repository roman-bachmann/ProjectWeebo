var React = require('react');

var Login = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Login page</h1>
                <form action="/api/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = Login;
