import React, { Component } from 'react';
import bible_api from './img/bible_api.png';
import exercise_database from './img/exercise_database.png';
import express_project from './img/express_project.png';
import file_upload from './img/file_upload.png';
import bakers_list from './img/bakers_list.png';
import simple_task from './img/simple_task.png';

class Portfolio extends Component {
  render() {
    return (
      <div>
        <div id="projects-div">
          <Project title="Simple Task" href="https://simple-task-1209.herokuapp.com" src={simple_task} preview="https://simple-task-1209.herokuapp.com"/>
          <Project title="Bakers List" href="https://github.com/seely1991/bakers-list-react" src={bakers_list} preview="https://bakers-list.herokuapp.com"/>
          <Project title="Bible API" href="https://glitch.com/edit/#!/functional-pancreas?path=server.js:1:0" src={bible_api} preview="https://functional-pancreas.glitch.me/"/>          
          <Project title="Simple Stopwatch" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.jpwWOM.small.e3662075-3c75-4a47-baf4-f585916fe69f.png"/>
          <Project title="Express Project" href="https://glitch.com/edit/#!/bouncy-market?path=server.js:1:0" src={express_project} preview="https://bouncy-market.glitch.me/"/>
          <Project title="Exercise Database" href="https://glitch.com/edit/#!/brindle-book?path=server.js:1:0" src={exercise_database} preview="https://brindle-book.glitch.me/"/>
          <Project title="Practice File Uploader" href="https://glitch.com/edit/#!/grandiose-chamomile?path=server.js:1:0" src={file_upload} preview="https://grandiose-chamomile.glitch.me/"/>
          <Project title="Drum Machine" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.gjBPqY.small.4e8952e3-e491-44dc-87c5-632f89b2573e.png"/>
          <Project title="Javascript Calculator" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.EpONBM.small.e2eef502-e14f-42fa-a0b5-2d3133219795.png"/>        
          <Project title="D3 Tree Map" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.RYWoGJ.small.ae6a249a-de88-4819-9b1c-ab6b8a85afbf.png"/>
          <Project title="D3 Chloropleth Map" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.ZMbGme.small.4931eb21-ea7b-4dc6-8349-1cecd5e9c76f.png"/>
          <Project title="D3 Heat Map" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.WgvOwp.small.1c62d38e-3efe-4ebf-81a7-161f3d95b0f3.png"/>
          <Project title="D3 Scatter Plot" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.GXKZxj.small.df5090e8-3b23-4838-8ec1-841e9250b4d0.png"/>
          <Project title="D3 Bar Chart" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.ajgPgX.small.b5716128-6f8c-4e87-a24b-0bf284693bad.png"/>
          <Project title="Product Landing Page" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.RBgdmq.small.bddae7f3-ccea-472e-8920-646408aa4d9b.png"/>
          <Project title="Simple Form" src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/2198892.KBqdEM.small.a0334fb6-b6a8-4df8-838e-9c0d014a6a99.png"/>
          <Project title="Random Chord Generator" src="https://github.com/seely1991/Random-Chord-Generator"/>
        </div>
      </div>
    );
  }
}

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let thisProps = this.props;
    let name = thisProps.title;
    name = name.replace(/\s/g, '-');
    console.log(name)

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
        <a href={getUrl()} target="blank">
          {this.props.title}
          <img className="project-img" src={this.props.src} />
        </a>
        <a href={getPreviewUrl()} target="blank">
          <button>Preview</button>
        </a>
      </div>
      )
  }
}

export default Portfolio;
