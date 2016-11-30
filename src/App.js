import React, { Component } from 'react';
import './css/reset.css';
import './css/base.css';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import listaFotos from './reducers/listaFotos';
import notificacao from './reducers/notificacao';

class App extends Component {

  constructor(){
    super();

    const reducers = combineReducers({
      listaFotos,
      notificacao
    });

    this.store = createStore(reducers, applyMiddleware(thunkMiddleware));    
  }

  render() {          
    return (
      <div className="main">
        <Header store={this.store}/>
        <Timeline login={this.props.params.login}  store={this.store}/>
      </div>
    );
  }
}

export default App;
