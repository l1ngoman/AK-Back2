import React, { Component } from 'react';
import AuthService from '../services'


class Nav extends Component {
  constructor(props){
    super(props)

    this.auth = new AuthService()
    this.state = {
      signedIn: this.auth.loggedIn(),
    }
  }

  render() {
    console.log("Nav rendering");
    return (
      <div id="navBar">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Home</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a href="/about">About</a></li>
                <li><a href="#">Contact</a></li>
                {!this.auth.loggedIn() && <li><a href="/register">Join</a></li>}
                {this.auth.loggedIn() && <li><a href="/apartments/new">New</a></li>}
                {this.auth.loggedIn() && <li><a href="/my_apartments">My Apartments</a></li>}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {this.auth.loggedIn() && <li><a onClick={this.handleLogout} href="/login">Sign Out</a></li>}
                {!this.auth.loggedIn() && <li><a href="/login">Login</a></li>}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  componentDidMount() {
    this.props.checkForToken();
    this.setState({signedIn: this.auth.loggedIn()})
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.auth.logout();
    this.props.checkForToken();
    this.setState({signedIn: this.props.hasToken})
  }

}

export default Nav;
