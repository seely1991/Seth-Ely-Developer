import React, { Component } from 'react';

//this is the page for creating a user profile for posting, might be completely private so that not everyone can make one
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('api/create_profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.text())
    .then(res => {
      alert(res);
      window.location.href='/create'
    })
  }
  onChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    return(
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="name of author" name="author" onChange={this.onChange} />
          <input type="text" placeholder="username" name="username" onChange={this.onChange} />
          <input type="password" placeholder="password" name="password1" onChange={this.onChange} />
          <input type="password" placeholder="retype password" name="password2" onChange={this.onChange} />
          <button type="submit" onSubmit={this.handleSubmit}>submit</button>
        </form>
      )
  }
}

export default Register;