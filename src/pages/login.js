import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AuthService from '../services'


class Login extends Component {
  constructor(props) {
		super(props)
    this.auth = new AuthService()
    this.state = {
        loginSuccess: false,
        hasToken: false,
        form: {
          user: {
            email: 'js@gmail.com',
            password: 'passwords@#'
          }
        }
    }
  }
  render() {
    let { email, password } = this.state.form.user;
    return (
      <div className="formPage">
        <div className="formField">
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label for="email" className="col-lg-2 control-label">Email</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="email" value={email} placeholder="yourname@example.com"/>
                </div>
              </div>
              <div className="form-group">
                <label for="password" className="col-lg-2 control-label">Password</label>
                <div className="col-lg-10">
                  <input type="password" onChange={this.handleChange} className="form-control input" id="password" value={password} placeholder="Secrets"/>
                </div>
              </div>
            </fieldset>
          </form>
          <div className="formButtons">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Log In</button>
          </div>
        </div>
        {this.state.loginSuccess && <Redirect to="/" />}

      </div>
    );
  }

  handleChange = (e) => {
    console.log(e.target.value);
    let { user } = this.state.form;
    user[e.target.id] = e.target.value;
    this.setState({user});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.auth.login(this.state.form)
    .then(status => {
      if(status.errors){
        console.log(status.errors);
        console.log("login failed")
      }else{
        this.props.checkForToken()
        this.setState({loginSuccess: true})
        console.log("login successful")
      }
    })
  }
}

export default Login;
