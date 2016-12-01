import React, { Component } from 'react';
import './css/reset.css';
import './css/base.css';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

class App extends Component {
  render() {          
    return (
      <div className="main">
        <Header store={this.context.store}/>
        <Timeline login={this.props.params.login}  store={this.context.store}/>
      </div>
    );
  }
}

App.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default App;
