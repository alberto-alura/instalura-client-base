import React, { Component } from 'react';
import FotoItem from './FotoItem';
import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';
import TimelineApi from '../api/TimelineApi';
import { connect } from 'react-redux'

class Timeline extends Component {
	

	constructor(props){
		super();
		let urlTimeline;
		if(props.login === undefined) {
			urlTimeline = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
		} else {
			urlTimeline = `http://localhost:8080/api/public/fotos/${props.login}`;
		}	

		this.urlTimeline = urlTimeline;														 		
	}	

	componentDidMount(){			
		this.props.listaCallback(this.urlTimeline);
	}

	componentWillReceiveProps(nextProps){		
		if(nextProps.login !== undefined){
			this.urlTimeline = `http://localhost:8080/api/public/fotos/${nextProps.login}`;			
			this.props.listaCallback(this.urlTimeline);
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
								return <FotoItem key={foto.id} foto={foto} comentaCallback={this.props.comentaCallback} likeCallback={this.props.likeCallback}/>;
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
    likeCallback: (fotoId) => {		
		dispatch(TimelineApi.like(fotoId));    
    },
    comentaCallback: (fotoId,texto) => {		
		dispatch(TimelineApi.comenta(fotoId,texto));    	
    },
	listaCallback: (urlTimeline) => {
		dispatch(TimelineApi.lista(urlTimeline));
	}
  }
};

const TimelineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

export default TimelineContainer