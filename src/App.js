import React, { Component } from 'react';
import './css/reset.css';
import './css/base.css';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import TimelineStore from './actions/TimelineStore';

class App extends Component {

  constructor(){
    super();
    this.timelineStore = new TimelineStore([]);
  }

  render() {          
    return (
      <div className="main">
        <Header timelineStore={this.timelineStore}/>
        <Timeline login={this.props.params.login}  timelineStore={this.timelineStore}/>
      </div>
    );
  }
}

export default App;
