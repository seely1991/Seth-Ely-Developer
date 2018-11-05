import React, { Component } from 'react';
import './App.css';

/*articles need the following in a json format:
-title
-body
-publish date
*/
class App extends Component {
  render() {
    return (
      <div>
        <form action="/api/create_profile" method="POST">
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password1" />
          <input type="password" placeholder="retype password" name="password2" />
          <button type="submit">submit</button>
        </form>
        <form action="/api/post_article" method="POST">
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password" />
          <input type="text" placeholder="title of article" name="title" />
          <textarea rows="4" name="article_data"/>
          <button type="submit">submit</button>
        </form>
        <Articles />
      </div>
    );
  }
}

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
      fetch('/api/users')
      .then(res => res.json())
      .then(res => {
        console.log({articles: res.posts});
        this.setState({articles: res.posts})
      })
    }
  render() {
    console.log(this.state)
    return this.state.articles.map((x, index) => {
      return (
        <a ref={index} href={'/api/article?title=' + x.title}>
          <h1>{x.title}</h1>
          <p>{x.article}</p>
        </a>
        )
    })
  }
}

export default App;
