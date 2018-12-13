import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './pages/index';
import Apartment from './pages/apartment';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/header';
import NewApartment from './pages/newApartment'
import EditApartment from './pages/editApartment'
import About from './pages/about'
import AuthService from './services'
import MyApartments from './pages/myApartments'
import Profile from './pages/profile'
import { getProfile } from './api'


class App extends Component {
  constructor(props) {
    super(props)

    this.auth = new AuthService()
    this.state = {
      hasToken: false,
      profile: {
        user_id: '',
        first_name: '',
        last_name: '',
        full_name: '',
        phone: ''
      }
    }
  }
  render() {
    return (
      <div id="big">
        <Header
          checkForToken={this.checkForToken}
          hasToken={this.state.hasToken}
          username={this.state.profile.first_name}
          user_id={this.state.profile.user_id}
          />
        <Router>
          {(this.auth.loggedIn())
          ?<Switch> //protected paths
            <Route exact path='/apartments/new' component={NewApartment} /> //protected
            <Route exact path='/apartments/:id/edit' component={EditApartment} /> //protected
            <Route exact path='/apartments/:id' component={Apartment} />
            <Route exact path='/login' render={(props) => <Login checkForToken={this.checkForToken}/>} />
            <Route exact path='/profiles/:id' render={(props) => <Profile profile={this.state.profile} />}/>
            <Route exact path='/register' component={Register} />
            <Route exact path='/my_apartments' component={MyApartments} />
            <Route exact path='/about' component={About} />
            <Route path='/apartments' component={Index} />
            <Route path='/' component={Index} />
          </Switch>

          :<Switch> //public paths
            <Redirect from='/apartments/new' to="/login" />
            <Redirect from='/apartments/:id/edit' to="/login" />
            <Redirect from='/my_apartments' to="/login" />
            <Redirect from='/profiles/:id' to="/login" />
            <Route exact path='/apartments/:id' component={Apartment} />
            <Route exact path='/login' render={(props) => <Login checkForToken={this.checkForToken}/>} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/about' component={About} />
            <Route path='/apartments' component={Index} />
            <Route path='/' component={Index} />
          </Switch>}
        </Router>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.auth.getUserId());
    let { profile } = this.state
    getProfile(this.auth.getUserId())
    .then(APIprofile => {
      console.log(APIprofile);
      this.setState({profile: APIprofile})
    })
  }

checkForToken = () => {
  console.log("rerendering app.js");
  this.setState({hasToken: this.auth.loggedIn()})
}

}

export default App;
