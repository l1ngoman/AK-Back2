import React, { Component } from 'react';
import { getProfile } from '../api'

class App extends Component {
  render() {
    let { first_name, last_name, phone } = this.props.profile
    return (
      <div id="big">
        <main>
          <div className="infoPage">
            <h1 className="infoPage">My Profile</h1>
            <br/>
            <br/>
            <p className="infoPage">{`First Name: ${first_name}`}</p>
            <p className="infoPage">{`Last Name: ${last_name}`}</p>
            <p className="infoPage">{`Phone: ${phone}`}</p>
          </div>
        </main>
      </div>
    );
  }

}

export default App;
