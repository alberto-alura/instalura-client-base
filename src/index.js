import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import {Router, Route,browserHistory} from 'react-router';

const verificaAutenticacao = (nextState, replace) => {				
	if(localStorage.getItem("auth-token")==='undefined'){		
		replace('/?msg=precisa fazer o login');
	}	
}

ReactDOM.render((
		<Router history={browserHistory}>	    	
			<Route path="/" component={Login}/>
			<Route path="/logout" component={Logout}/>	    	    	
	    	<Route path="/timeline" component={App} onEnter={verificaAutenticacao}/>	    	    	
	    </Router>
), document.getElementById('root'));
