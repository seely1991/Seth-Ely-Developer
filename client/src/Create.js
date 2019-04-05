import React, { Component } from 'react';
import { MyEditor } from './WYSIWYG.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTimes)


//this is the page for creating a blog post
class Create extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: '',
      username: '',
      password: '',
      article_data: '',
      loaded: false,
      deleting: false
    };
    this.setValue=this.setValue.bind(this);
    this.onChange=this.onChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.setLoaded=this.setLoaded.bind(this);
    this.updateArticle=this.updateArticle.bind(this);
    this.toggleDelete=this.toggleDelete.bind(this);
    this.deleteArticle=this.deleteArticle.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('api/post_article', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        username: this.state.username,
        password: this.state.password,
        article_data: this.state.article_data
      })
    })
    .then(res => res.text())
    .then(res => {
      alert(res);
      window.location.href = '/';
    })
  }
  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state)
  }
  setValue(val) {
    this.setState({article_data: val});
  }
  setLoaded() {
    this.setState({loaded: true, previousTitle: this.state.title});
  }
  updateArticle(event) {
    event.preventDefault();
    fetch('api/update_article', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        username: this.state.username,
        password: this.state.password,
        article_data: this.state.article_data,
        previousTitle: this.state.previousTitle
      })
    })
    .then(res => res.text())
    .then(res => {
      alert(res);
      window.location.href = '/';
    })
  }
  toggleDelete(event) {
    event.preventDefault();
    this.setState({deleting: !this.state.deleting})
  }
  deleteArticle(event) {
    event.preventDefault();
    fetch('api/delete_article', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.deleteTitle,
        username: this.state.deleteUsername,
        password: this.state.deletePassword
      })
    })
    .then(res => res.text())
    .then(res => alert(res))
  }
  render() {
    let onSubmit = this.handleSubmit;
    let value = "submit";
    let deleteDiv;
    if (this.state.loaded) {
      onSubmit = this.updateArticle;
      value = "update";
    };
    if (this.state.deleting) {
      deleteDiv = (
        <div>
          <div className="delete-container" onClick={this.toggleDelete} />
          <form className="delete-div" onSubmit={this.deleteArticle}>
            <button id="delete-exit" onClick={this.toggleDelete}><FontAwesomeIcon icon="times" /></button>
            <p className="delete-warning">Are you sure you want to delete this article permanently?</p>
            <p className="delete-confirm-title">type in the name of the article to confirm</p>
            <input type="text" name="deleteTitle" required onChange={this.onChange} />
            <input type="text" name="deleteUsername" placeholder="username" required onChange={this.onChange} />
            <input type="password" name="deletePassword" placeholder="password" required onChange={this.onChange} />
            <input type="submit" id="final-delete" value="delete permanently" onSubmit={this.deleteArticle} disabled={!(this.state.previousTitle === this.state.deleteTitle)} />
          </form>
        </div>
      )
    }
    return (
      <div>
        {deleteDiv}
        <form onSubmit={onSubmit}> 
          <input id="title-input" type="text" name="title" placeholder="title of article" required onChange={this.onChange} />
          <MyEditor setValue={this.setValue} title={this.state.title} setLoaded={this.setLoaded} toggleDelete={this.toggleDelete} />
          <div className="submit-stuff">
            <input type="text" placeholder="username" name="username" required onChange={this.onChange} />
            <input type="password" placeholder="password" name="password" required onChange={this.onChange} />
            <input type="submit" className="green-button" value={value} onSubmit={onSubmit} />
          </div>
        </form>
      </div>
    )
  }
}

export default Create;