import React, { Component } from 'react';
import Form from '../components/form'

class EditApartment extends Component {
  render() {
    console.log(this.props.match.params);
    return (
      <div id="aptForm">
        <Form id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default EditApartment;
