import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { getUserApartments } from '../api'
import AuthService from '../services'
import Tile from '../components/tile'

class MyApartments extends Component {
  constructor(props){
    super(props)

    this.auth = new AuthService();
    this.state = {
      aptArray: []
    }
  }

  render() {
    let userApts = this.state.aptArray.map((apt,i) => {
      return(
        <Tile key={i} apt={apt}/>
      );
    })
    return (
      <div id="big">
        <main>
          <article>
            {userApts}
          </article>
        </main>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.auth.getUserId());
    const user_id = this.auth.getUserId();
    getUserApartments(user_id)
    .then(APIapts => {
      console.log(APIapts);
      this.setState({aptArray: APIapts})
    })

  }

}

export default MyApartments;
