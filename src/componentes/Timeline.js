import React, { Component } from 'react';
import FotoItem from './FotoItem';
import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';
import TimelineApi from '../api/TimelineApi';
import { connect } from 'react-redux'

class Timeline extends Component {
	

	constructor(props){
		super();
		this.login = props.login;
		let urlTimeline;
		if(props.login === undefined) {
			urlTimeline = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
		} else {
			urlTimeline = `http://localhost:8080/api/public/fotos/${props.login}`;
		}	

		this.urlTimeline = urlTimeline;														 		
	}	

	componentDidMount(){			
		this.props.lista(this.urlTimeline);
	}

	componentWillReceiveProps(nextProps){				
		if(nextProps.login !== this.login){
			this.login = nextProps.login;
			this.urlTimeline = `http://localhost:8080/api/public/fotos/${this.login}`;			
			this.props.lista(this.urlTimeline);
		}
	}

	render(){		
        return (<div className="fotos container">
			<ReactCSSTransitionGroup 
			transitionName="timeline"
		    transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>		
						{
							this.props.fotos.map(foto => {
								return <FotoItem key={foto.id} foto={foto} comentaCallback={this.props.comenta} likeCallback={this.props.like}/>;
							})
						} 
			</ReactCSSTransitionGroup>         			                   		
		</div>        
        		);
	}
}

const mapStateToProps = (state) => {        
  return {
    fotos: state.listaFotos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    like: (fotoId) => {		
		dispatch(TimelineApi.like(fotoId));    
    },
    comenta: (fotoId,texto) => {		
		dispatch(TimelineApi.comenta(fotoId,texto));    	
    },
	lista: (urlTimeline) => {
		dispatch(TimelineApi.lista(urlTimeline));
	}
  }
};

const TimelineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

export default TimelineContainer