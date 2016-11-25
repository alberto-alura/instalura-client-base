import React, { Component } from 'react';
import './css/reset.css';
import './css/base.css';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

class App extends Component {

  render() {          
    return (
      <div className="main">
        <Header/>
        <Timeline login={this.props.params.login}  />
      </div>
    );
  }
}

export default App;
