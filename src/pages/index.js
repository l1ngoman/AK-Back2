import React, { Component } from 'react';
import Tile from '../components/tile'
import { getApartments } from '../api'


class Index extends Component {
  constructor(props){
    super(props)

    this.state = {
      allApts: [],
      width: "45%"
    }
  }
  render() {
    console.log(this.props.match.params);
    let stillLoading;
    if(this.state.allApts.length == 0){
      stillLoading = true
    }else{
      stillLoading = false
    }
    let { allApts } = this.state
    let apts = allApts.map((apt,i) => {
        return <Tile key={i} apt={apt}/>
    })

    return (
      <main>
        <h1 id="banner" className="text-info">Take a look at our apartments!</h1>
        {!stillLoading && <article>
                            {apts}
                          </article>}
        {stillLoading && <img id="loading" src="https://www.pedul.com/images/loading.gif" />}
      </main>
    );
  }

  componentDidMount() {
    getApartments()
    .then(APIapts => {
      this.setState({allApts: APIapts})
    })
  }
}

export default Index;
