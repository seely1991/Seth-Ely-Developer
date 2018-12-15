import React, { Component } from 'react';
import { MyEditor, ReadOnlyEditor } from './WYSIWYG.js';
import { DiscussionEmbed } from 'disqus-react';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.match.params.title
    }
  }
  componentDidMount() {
      fetch('/api/article?title='+this.state.title)
      .then(res => res.json())
      .then(res => {
        this.setState({body: res.body, comments: res.comments, id: res._id, author: res.author})
        console.log(this.state)
      })
    }

  render() {
    let article;
      if (this.state.body) {
        article = (
            <ReadOnlyEditor content={this.state.body} author={this.state.author} />
          ) 
      }
      const disqusShortname = 'Seth-Ely';
      const disqusConfig = {
        identifier: this.state.id,
        title: this.state.title
      } 
    return (
      <div className="article-div">
        <h1>{this.state.title}</h1>
        {article}
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
      )
  }
}

export default Article;