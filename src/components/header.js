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
        <div id="headerLeft">
          Real Estate
        </div>
        <div id="headerRight">
          <h2 id="headerBanner">"Find your home at home."</h2>
          <Nav checkForToken={this.props.checkForToken} token={this.props.token}/>
        </div>
      </div>
    );
  }
  refresh = () => {

    this.setState({hasToken: false})
  }
}

export default Header;
