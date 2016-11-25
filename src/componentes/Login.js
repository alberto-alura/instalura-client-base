import React, { Component } from 'react';
import { browserHistory } from 'react-router'


export default class Login extends Component {

	constructor(props) {
		super();		
		this.state = {login: '', senha: '',msg:props.location.query.msg};
		this.envia = this.envia.bind(this);		
	} 

	onChangeInput(e) {		
		this.setState({[e.target.name]: e.target.value});
	}
	
	envia(event){		
		event.preventDefault();

		var login = this.state.login.trim();
		var senha = this.state.senha.trim();

		const requestInfo = {
			method:'POST',
			body:JSON.stringify({login:login,senha:senha}),
			headers: new Headers({
				'Content-Type':'application/json'	
			})	
		};

		fetch('http://localhost:8080/api/public/login',requestInfo)
			.then(response => {
				if(response.ok){
					return response.text();											
				} else {
					this.setState({msg:"login ou senha inválidos"});
				}
			})
			.then(token => {
				localStorage.setItem('auth-token', token);
				browserHistory.push("/timeline");				
			});

	}

	render() {	
		
		return (	
			<div>	
				<span>{this.state.msg}</span>					
				<form onSubmit={this.envia}>
					<input type="text" name="login"  value={this.state.login} onChange={this.onChangeInput.bind(this)}/>
					<input type="password"  name="senha" value={this.state.senha} onChange={this.onChangeInput.bind(this)} />	
					<input type="submit" value="Login" />
				</form>
			</div>
		);
	}
}