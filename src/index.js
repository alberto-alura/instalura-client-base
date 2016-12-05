import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import {Router, Route,browserHistory} from 'react-router';
import { createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import listaFotos from './reducers/listaFotos';
import notificacao from './reducers/notificacao';
import { Provider } from 'react-redux'

const verificaAutenticacao = (nextState, replace) => {	
	console.log(localStorage.getItem("auth-token"));			
	if(localStorage.getItem("auth-token")===null){		
		replace('/?msg=precisa fazer o login');
	}	
}

const reducers = combineReducers({
	listaFotos,
	notificacao
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render((
		<Provider store={store}>
			<Router history={browserHistory}>	    	
				<Route path="/" component={Login}/>
				<Route path="/logout" component={Logout}/>
				<Route path="/timeline" component={App} onEnter={verificaAutenticacao}/>	    	    	
				<Route path="/timeline/:login" component={App} onEnter={verificaAutenticacao}/>	    	    	
			</Router>
		</Provider>
), document.getElementById('root'));
