import React, { Component } from 'react';
import { createApartment, getApartment, editApartment  } from "../api"
import AuthService from '../services'
import { Redirect } from 'react-router-dom'


class Form extends Component {
  constructor(props) {
		super(props)
    this.auth = new AuthService()
    this.state = {
        submitted: false,
        page: '',
        form: {
          apt: {
            street_a: '',
            street_b: '',
            postal_code: '',
            state: '',
            country: '',
            city: '',
            manager_name: '',
            phone: '',
            hours: '',
            description: '',
            long_desc: '',
            user_id: this.auth.getUserId()
          }
        }
    }
  }
  render() {
    console.log(this.state.form.apt);
    let { street_a, street_b, postal_code, state, country, city, manager_name, phone, hours, description, long_desc } = this.state.form.apt
    return (
      <div className="newApartment">
        <div className="formField">
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label for="street_a" className="col-lg-2 control-label">Cross-Street 1</label>
                <div className="col-lg-10">
                  <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control input"
                  id="street_a"
                  value={street_a}
                  placeholder="Main St"

                  />
                </div>
              </div>
              <div className="form-group">
                <label for="street_b" className="col-lg-2 control-label">Cross-Street 2</label>
                <div className="col-lg-10">
                  <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control input"
                  id="street_b"
                  value={street_b}
                  placeholder="Elm St"

                  />
                </div>
              </div>
              <div className="form-group">
                <label for="postal_code" className="col-lg-2 control-label">Zip Code</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="postal_code" value={postal_code} placeholder="90210"/>
                </div>
              </div>
              <div className="form-group">
                <label for="state" className="col-lg-2 control-label">State</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="state" value={state} placeholder="State"/>
                </div>
              </div>
              <div className="form-group">
                <label for="country" className="col-lg-2 control-label">Country</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="country" value={country} placeholder="Country"/>
                </div>
              </div>
              <div className="form-group">
                <label for="city" className="col-lg-2 control-label">City</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="city" value={city} placeholder="City"/>
                </div>
              </div>
              <div className="form-group">
                <label for="manager_name" className="col-lg-2 control-label">Manager Name</label>
                <div className="col-lg-10">
                  <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control input"
                  id="manager_name"
                  value={manager_name}
                  placeholder="John Smith"

                  />
                </div>
              </div>
              <div className="form-group">
                <label for="phone" className="col-lg-2 control-label">Phone</label>
                <div className="col-lg-10">
                  <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control input"
                  id="phone"
                  value={phone}
                  placeholder="800-555-5555"

                  />
                </div>
              </div>
              <div className="form-group">
                <label for="hours" className="col-lg-2 control-label">Hours</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="hours" value={hours} placeholder="9-5pm"/>
                </div>
              </div>
              <div className="form-group">
                <label for="description" className="col-lg-2 control-label">Blurb</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="description" value={description} placeholder="Write a short description for your apartment."/>
                </div>
              </div><div className="form-group">
                <label for="long_desc" className="col-lg-2 control-label">Details</label>
                <div className="col-lg-10">
                  <input type="text" onChange={this.handleChange} className="form-control input" id="long_desc" value={long_desc} placeholder="Write a detailed description for your apartment."/>
                </div>
              </div>
            </fieldset>
          </form>
          <div className="formButtons">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Create</button>
          </div>
        </div>
        {this.state.submitted && <Redirect to="/my_apartments"/>}
      </div>
    );
  }

  componentDidMount() {
    let { form } = this.state
    let { id } = this.props
    if(id >= 0){
      getApartment(id)
      .then(APIapt => {
        console.log(APIapt);
        form.apt = APIapt
        this.setState({form: form ,page: 'edit'})
      })
    }else {
      console.log("I suck");
      this.setState({page: 'new'})
    }
  }

  handleChange = (e) => {
    console.log(e.target.value);
    let { apt } = this.state.form;
    apt[e.target.id] = e.target.value;
    this.setState({apt});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.page === 'new'){
      console.log(this.state.form.apt);
      createApartment(this.state.form.apt)
      .then(APIapt => {
        console.log(APIapt);
        this.setState({submitted: true})
      })
    }else{
      editApartment(this.state.form.apt)
      .then(resp => {
        this.setState({submitted: true})
      })
    }
  }

}

export default Form;
