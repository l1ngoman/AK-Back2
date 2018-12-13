import React, { Component } from 'react';
import Nav from './nav'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasToken: false
    }
  }
  render() {
    console.log("Header rending");
    return (
      <div id="header">
          <div className="headerLeft">
          <h6 className="headerLeft">Welcome, {this.props.username}!</h6>
          <h5 className="headerLeft">Real Estate</h5>
          </div>
        <div className="headerRight">
          <h2 id="headerBanner">"Find your home at home."</h2>
          <Nav
            checkForToken={this.props.checkForToken}
            token={this.props.token}
            user_id={this.props.user_id}
          />
        </div>
      </div>
    );
  }
  refresh = () => {

    this.setState({hasToken: false})
  }
}

export default Header;
