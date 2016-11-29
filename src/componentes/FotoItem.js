import React, { Component } from 'react';
import {Link} from 'react-router';
import PubSub from 'pubsub-js';

export default class FotoItem extends Component {
	render() {
		const {comentaCallback,likeCallback,foto} = this.props;
		return (
          <div className="foto">
          	<FotoHeader foto={foto}/>
            <img alt="foto" className="foto-src" src={foto.urlFoto}/>
            <FotoInfo foto={foto}/>
            <FotoAtualizacoes foto={foto} comentaCallback={comentaCallback} likeCallback={likeCallback}/>
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

	 PubSub.subscribe("adiciona-comentario",(msg,object) => {
		 if(this.props.foto.id === object.fotoId){		 							
			this.setState({comentarios : this.state.comentarios.concat(object.novoComentario)});
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
              		this.state.comentarios.map(comentario => {
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
		this.state = {likeada : props.foto.likeada,comentario:''};
	}

	lidaComInput(event){
		this.setState({comentario:event.target.value});
	}

	like(event){
		event.preventDefault();
		const likeada = !this.state.likeada;
		this.setState({likeada});
		
		this.props.likeCallback(this.props.foto.id,likeada);
	}	

	comenta(event){
		event.preventDefault();
		this.props.comentaCallback(this.props.foto.id,this.state.comentario);
	}

	render(){
		return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" required onChange={this.lidaComInput.bind(this)}/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>

            </section>			
		);
	}	
}