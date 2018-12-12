import React, { Component } from 'react';
import AuthService from '../services'
import { Redirect } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
		super(props)
    this.auth = new AuthService()
    this.state = {
        loginSuccess: false,
        form: {
          user: {
            name: 'John Smith',
            email: 'js@gmail.com',
            password: 'passwords@#'
          }
        }
    }
	}
  render() {
    let { name, email, password } = this.state.form.user
    return (
      <div className="formPage">
        <div className="formField">
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label for="name" className="col-lg-2 control-label">Full Name</label>
                <div className="col-lg-10">
                  <input type="text"
                    onChange={this.handleChange}
                    className="form-control input"
                    id="name"
                    value={name}
                    placeholder="First Last"
                    />
                </div>
              </div>
              <div className="form-group">
                <label for="email" className="col-lg-2 control-label">Email</label>
                <div className="col-lg-10">
                  <input type="text"
                    onChange={this.handleChange}
                    className="form-control input"
                    id="email"
                    value={email}
                    placeholder="yourname@example.com"
                        />
                </div>
              </div>
              <div className="form-group">
                <label for="password" className="col-lg-2 control-label">Password</label>
                <div className="col-lg-10">
                  <input type="password"
                    onChange={this.handleChange}
                    className="form-control input"
                    id="password"
                    value={password}
                    placeholder="Secrets"
                    />
                </div>
              </div>
            </fieldset>
          </form>
          <div className="formButtons">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Register</button>
          </div>
        </div>
        {this.state.loginSuccess && <Redirect to='/' />}
      </div>
    );
  }

  handleChange = (e) => {
    console.log(e.target.value);
    let { user } = this.state.form;
    user[e.target.id] = e.target.value;
    this.setState({user})
  }

  handleSubmit = (e) => {
    let { form } = this.state;
    console.log(form);
    e.preventDefault();
    this.auth.register(form)
    .then(status => {
      if(status.errors){
        console.log(status.errors.status);
        this.setState({loginSuccess: false})
      }else{
        this.auth.login(form)
        this.setState({loginSuccess: true})
      }
    })
  }
}

export default Register;
