import React, { Component } from 'react';
import {Link} from 'react-router';
import PubSub from 'pubsub-js';

export default class FotoItem extends Component {
	render() {
		return (
          <div className="foto">
          	<FotoHeader foto={this.props.foto}/>
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
            <FotoInfo foto={this.props.foto}/>
            <FotoAtualizacoes foto={this.props.foto}/>
          </div>          			
		);
	}
}

class FotoHeader extends Component {
	render(){
		return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
										<Link key={this.props.foto.loginUsuario} to={`/timeline/${this.props.foto.loginUsuario}`}>
											{this.props.foto.loginUsuario}
										</Link>              				  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
            </header>			
		);
	}
}

class FotoInfo extends Component {

	constructor(props){
		super();
		this.state = {likers : props.foto.likers,comentarios : props.foto.comentarios};
	}


 componentWillMount(){
	 PubSub.subscribe("adiciona-liker",(msg,object) => {
		 if(this.props.foto.id === object.fotoId){		 
			const likers = this.state.likers.concat(object.liker);		 
			this.setState({likers});		 
		 }
	 });

	 PubSub.subscribe("remove-liker",(msg,object) => {
		 if(this.props.foto.id === object.fotoId){		 					 
			this.setState({likers : this.state.likers.filter( liker => liker.login !== object.liker.login)});
		 }
	 });	 
 }

	render(){
		return (
            <div className="foto-info">
              <div className="foto-info-likes">

              	{
              		this.state.likers.map(liker => {
              			return (
			                <Link key={liker.login} to={`/timeline/${liker.login}`}>
			                  {liker.login},
			                </Link>              				
              			);
              		})
              	}

             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                {this.props.foto.comentario}
              </p>

              <ul className="foto-info-comentarios">
              	{
              		this.props.foto.comentarios.map(comentario => {
              			return (
			                <li key={comentario.id} className="comentario">
			                  <a className="foto-info-autor">{comentario.login} </a>
			                    {comentario.texto}
			                </li>              				
              			);
              		})
              	}
              </ul>
            </div>			
		);
	}	
}

class FotoAtualizacoes extends Component {

	constructor(props){
		super();
		this.state = {likeada : props.foto.likeada};
	}

  like(event) {
		event.preventDefault();

		const requestInfo = {
			method:'POST'
		};

		fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
			.then(response => {
				if(response.ok){
					return response.json();											
				} else {
					console.error("nao foi possivel fazer o like/dislike");
				}
			})
			.then(liker => {								
				const likeada = !this.state.likeada;
				this.setState({likeada});

				if(likeada) {
					PubSub.publish("adiciona-liker",{fotoId : this.props.foto.id,liker});
				} else {
					PubSub.publish("remove-liker",{fotoId : this.props.foto.id,liker});
				}
			})				
	}


	render(){
		return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
              <form className="fotoAtualizacoes-form">
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>

            </section>			
		);
	}	
}