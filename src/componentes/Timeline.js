import React, { Component } from 'react';
import FotoItem from './FotoItem'

export default class Timeline extends Component {

	constructor(){
		super();
		this.state = {fotos:[]};
	}

	componentDidMount(){
		fetch("http://localhost:8080/api/public/fotos/vitor")
			.then(response => {
				return response.json();
			})
			.then(fotos => {				
				this.setState({fotos:fotos});
			});
	}

	render(){
        return (<div className="fotos container">
        			{
        				this.state.fotos.map(foto => {
        					return <FotoItem foto={foto}/>;
        				})
        			}          			                   		
				</div>        
        		);
	}
}