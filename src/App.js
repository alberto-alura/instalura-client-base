import React, { Component } from 'react';
import './css/reset.css';
import './css/base.css';
import Header from './componentes/Header';
import TimelineContainer from './componentes/Timeline';

class App extends Component {
  render() {          
    return (
      <div className="main">
        <Header store={this.context.store}/>
        <TimelineContainer login={this.props.params.login} />
      </div>
    );
  }
}

App.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default App;
