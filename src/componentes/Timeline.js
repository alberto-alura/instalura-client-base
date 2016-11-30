import React, { Component } from 'react';
import FotoItem from './FotoItem';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';
import TimelineAction from '../actions/TimelineAction';


export default class Timeline extends Component {
	

	constructor(props){
		super();
		let urlTimeline;
		if(props.login === undefined) {
			urlTimeline = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
		} else {
			urlTimeline = `http://localhost:8080/api/public/fotos/${props.login}`;
		}	

		this.urlTimeline = urlTimeline;		
		this.state = {fotos:[]};
		this.carregaFotos = this.carregaFotos.bind(this);		
		this.timelineAction = new TimelineAction(this.state.fotos);				 		
	}	

	componentWillMount(){
		PubSub.subscribe('timeline',(topic,{fotos}) => {						
			this.setState({fotos});
		});	 

		PubSub.subscribe("adiciona-comentario",(msg,object) => {
			const fotoAchada = this.state.fotos.filter(foto => foto.id === object.fotoId)[0];
			fotoAchada.comentarios = fotoAchada.comentarios.concat(object.novoComentario);
			this.setState({fotos:this.state.fotos});
		});		
	}

	carregaFotos(){		
		fetch(this.urlTimeline)
			.then(response => {
				return response.json();
			})
			.then(fotos => {	
				this.timelineAction = new TimelineAction(fotos);			
				this.setState({fotos});
			});		
	}	

	componentDidMount(){			
		this.carregaFotos();
	}

	componentWillReceiveProps(nextProps){		
		if(nextProps.login !== undefined){
			this.urlTimeline = `http://localhost:8080/api/public/fotos/${nextProps.login}`;
			this.carregaFotos(this);
		}
	}

  like(fotoId,likeada) {		
	this.timelineAction.like(fotoId,likeada);	  
  }

	comenta(fotoId,texto){
		event.preventDefault();
		const requestInfo = {
			method:'POST',
			body:JSON.stringify({texto}),
			headers: new Headers({
				'Content-Type':'application/json'	
			})			
		};

		fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
			.then(response => {
				if(response.ok){
					return response.json();											
				} else {
					console.error("nao foi possivel fazer o comentario");
				}
			})
			.then(novoComentario => {								
					PubSub.publish("adiciona-comentario",{fotoId,novoComentario});
			})		

	}



	render(){
        return (<div className="fotos container">
			<ReactCSSTransitionGroup 
			transitionName="timeline"
		    transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>		
						{
							this.state.fotos.map(foto => {
								return <FotoItem key={foto.id} foto={foto} comentaCallback={this.comenta.bind(this)} likeCallback={this.like.bind(this)}/>;
							})
						} 
			</ReactCSSTransitionGroup>         			                   		
		</div>        
        		);
	}
}