import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AuthService from '../services'
import './tile.css'
import { deleteApartment } from '../api'



class Tile extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      clicked: false,
      edited: false
    }
  }

    render() {
      let { street_a, street_b, description, id } = this.props.apt;
    return (
      <div id="tileView">
      <div id="tilePic">
        {this.auth.loggedIn() && <button className="btn btn-danger btn-xs delete" onClick={this.handleDelete} >DELETE</button>}
        {this.auth.loggedIn() && <button className="btn btn-primary btn-xs delete" onClick={this.handleEdit}>EDIT</button>}
      </div>
        <a href={`/apartments/${id}`}>
            <h4 className="text-info">{`${street_a} at ${street_b}`}</h4>
            <p>{description}</p>
        </a>
        {this.state.edited && <Redirect to={`/apartments/${id}/edit`} />}
      </div>
    );
  }

  handleDelete = () => {
    deleteApartment(this.props.apt.id)
    .then(resp => {
      console.log("Deleted!");
      this.setState({clicked: true})
    })
  }
  handleEdit = () => {
    this.setState({clicked: true,edited: true})
  }
}

export default Tile;
