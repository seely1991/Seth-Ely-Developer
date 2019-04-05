import React, { Component } from 'react';
import bible_api from './img/bible_api.jpg';
import exercise_database from './img/exercise_database.jpg';
import express_project from './img/express_project.jpg';
import file_upload from './img/file_upload.jpg';
import bakers_list from './img/bakers_list.jpg';
import simple_task from './img/simple_task.jpg';

class Portfolio extends Component {
  render() {
    return (
      <div>
        <div id="projects-div">
          <Project title="Simple Task" href="https://github.com/seely1991/simple-task" src={simple_task} preview="https://simple-task-1209.herokuapp.com" description='A simple to do list web app with full account login 
          and backend support. Meant to simulate the "post-it note on 
          a white-board" way of tracking progress for a project.'/>
          <Project title="Bakers List" href="https://github.com/seely1991/bakers-list-react" src={bakers_list} preview="https://bakers-list.herokuapp.com" description='My first attempt to create a full-stack web app. Simply add your ingredients to a list and save it to a database.'/>
          <Project title="Bible API" href="https://glitch.com/edit/#!/functional-pancreas?path=server.js:1:0" src={bible_api} preview="https://functional-pancreas.glitch.me/" description='This was an attempt to make a searchable API for finding bible verses. I converted a text document into JSON format using regex expressions.'/>          
          <Project title="Simple Stopwatch" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.jpwWOM.small.e3662075-3c75-4a47-baf4-f585916fe69f.png" description="A stopwatch app made with vanilla JS."/>
          <Project title="Drum Machine" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.gjBPqY.small.4e8952e3-e491-44dc-87c5-632f89b2573e.png" description="A working drum machine using vanilla JS. Use it to make some awesome beats!"/>
          <Project title="Javascript Calculator" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.EpONBM.small.e2eef502-e14f-42fa-a0b5-2d3133219795.png" description="A simple calculator using vanilla JS."/>        
          <Project title="Express Project" href="https://glitch.com/edit/#!/bouncy-market?path=server.js:1:0" src={express_project} preview="https://bouncy-market.glitch.me/" description="A project from FreeCodeCamp to perform simple API tasks."/>
          <Project title="Exercise Database" href="https://glitch.com/edit/#!/brindle-book?path=server.js:1:0" src={exercise_database} preview="https://brindle-book.glitch.me/" description="Another FCC project practicing get and post requests in node.js."/>
          <Project title="D3 Chloropleth Map" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.ZMbGme.small.4931eb21-ea7b-4dc6-8349-1cecd5e9c76f.png" description="A visual representation of the percent of people who are college educated by state."/>
          <Project title="D3 Tree Map" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.RYWoGJ.small.ae6a249a-de88-4819-9b1c-ab6b8a85afbf.png" description="A tree map displaying movie tickets sold."/>
          <Project title="D3 Heat Map" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.WgvOwp.small.1c62d38e-3efe-4ebf-81a7-161f3d95b0f3.png" description="A chart showing the average temperatures for each month since 1760."/>
          <Project title="D3 Scatter Plot" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.GXKZxj.small.df5090e8-3b23-4838-8ec1-841e9250b4d0.png" description="A scatter plot showing times for the Tour De France, and whether or not racers had been doping."/>
          <Project title="D3 Bar Chart" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.ajgPgX.small.b5716128-6f8c-4e87-a24b-0bf284693bad.png" description="A simple bar chart showing the net gross for different quarters of a fictional business since 1947."/>
          <Project title="Product Landing Page" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.RBgdmq.small.bddae7f3-ccea-472e-8920-646408aa4d9b.png" description="A simple product landing page for a fictional robot building company."/>
          <Project title="Simple Form" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.KBqdEM.small.a0334fb6-b6a8-4df8-838e-9c0d014a6a99.png" description="A simple form using vanilla js and html."/>
        </div>
      </div>
    );
  }
}

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.href
    }
    this.goToUrl=this.goToUrl.bind(this);
  }
  goToUrl(url) {
    console.log(url);
    window.open(url);
  }
  render() {
    let thisProps = this.props;
    let name = thisProps.title;
    name = name.replace(/\s/g, '-');
    console.log(name);

    function getUrl() {
      if (!thisProps.href) {
        return "https://github.com/seely1991/" + name;
      }else{
        return thisProps.href
      }
    }
    function getPreviewUrl() {
      if (!thisProps.preview) {
        return "https://seely1991.github.io/" + name
      }else{
        return thisProps.preview
      }
    }
    return (
      <div className="project-link-div">
        <p className="project-title">{this.props.title}</p>
        <div className="preview-flexbox">
          <img className="project-img" src={this.props.src} />
          <div className="description">{this.props.description}</div>
          <div className="buttons">
            <button className="preview-button, green-button" onClick={() => this.goToUrl(getPreviewUrl())}>Website</button>
            <button className="preview-button, green-button" onClick={() => this.goToUrl(getUrl())}>Repo</button>
          </div>
        </div>
      </div>
      )
  }
}

export default Portfolio;
