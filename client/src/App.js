import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import { MyEditor, ReadOnlyEditor } from './WYSIWYG.js';
import { stateToHTML } from 'draft-js-export-html';
import Article from './article.js';
import Portfolio from './portfolio.js';
import Create from './Create.js';
import Register from './Register.js';
import Home from './Home.js';
import About from './About.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <header>
          <Link to="/about">
            <img className="profile-pic" src="/profile_pic_2.png" />
            <div className="banner">Seth Ely</div>
          </Link>
          <Link to="/">All Articles</Link>
          <Link to="/create">Create</Link>
          <Link to="/portfolio">My Portfolio</Link>
          <Link to="/about">About Me</Link>
        </header>
        <Route path="/create" component={Create} />
        <Route exact={true} path="/" component={Home} />
        <Route path="/article/:title" component={Article} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default App;
