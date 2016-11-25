import React, { Component } from 'react';
import FotoItem from './FotoItem'

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
	}

	carregaFotos(component){		
		fetch(component.urlTimeline)
			.then(response => {
				return response.json();
			})
			.then(fotos => {				
				component.setState({fotos});
			});		
	}	

	componentDidMount(){			
		this.carregaFotos(this);
	}

	componentWillReceiveProps(nextProps){		
		if(nextProps.login !== undefined){
			this.urlTimeline = `http://localhost:8080/api/public/fotos/${nextProps.login}`;
			this.carregaFotos(this);
		}
	}

	render(){
        return (<div className="fotos container">
        			{
        				this.state.fotos.map(foto => {
        					return <FotoItem key={foto.id} foto={foto}/>;
        				})
        			}          			                   		
				</div>        
        		);
	}
}