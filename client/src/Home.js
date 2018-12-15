import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';


/*articles need the following in a json format:
-title
-body
-publish date
*/




class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
      fetch('/api/articles')
      .then(res => res.json())
      .then(res => {
        if (res !== "not found") {
          this.setState({articles: res})
        }
      })
      .catch(err => console.log({err: err}))
    }
  render() {
    console.log({
      articles: this.state.articles,
      length: this.state.articles.length
    })
    if (this.state.articles.length) {
      return this.state.articles.map((x, index) => {
        console.log({x: x, 'x.author': x.author})
        return (
          <Link to={'/Article/'+x.title} ref={index} >
            <div className="preview">
              <h3>{x.title}</h3>
              {/*<ReadOnlyEditor content={x.body} author={x.author} />
              <div className="fade"></div>*/}
            </div>
          </Link>
          )
      })
    }else{return null}
  }
}

export default Home;