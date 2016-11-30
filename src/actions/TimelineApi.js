import PubSub from 'pubsub-js';

export default class TimelineApi {

    constructor(listaFotos){
        this.listaFotos = listaFotos;
    }

	static lista(urlTimeline){
		return (dispatch) => { 
			return fetch(urlTimeline)
				.then(response => {
					return response.json();
				})
				.then(fotos => {
					dispatch({type:'LISTAGEM',fotos});	
					return fotos;
				});	
		}	
	}

    static like(fotoId,likeada) {
		return (dispatch) => {
			return fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{method:'POST'})
				.then(response => {
					if(response.ok){
						return response.json();											
					} else {
						console.error("nao foi possivel fazer o like/dislike");
					}
				})
				.then(liker => {
					dispatch({type:'LIKE',fotoId,likeada,liker});
					return liker;                                
				}) 
		}       
    }

    static comenta(fotoId,texto){
		const requestInfo = {
			method:'POST',
			body:JSON.stringify({texto}),
			headers: new Headers({
				'Content-Type':'application/json'	
			})			
		};
		return (dispatch) => {
			return fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
				.then(response => {
					if(response.ok){
						return response.json();											
					} else {
						console.error("nao foi possivel fazer o comentario");
					}
				})
				.then(novoComentario => {	 
					dispatch({type:'COMENTARIO',fotoId,novoComentario});           												
				})
		}
    }   
	
	pesquisa(login) {
		fetch(`http://localhost:8080/api/public/fotos/${login}`)
			.then(response => {
				return response.json();
			})
			.then(fotos => {
				this.listaFotos = fotos;				
				PubSub.publish('timeline',{fotos:this.listaFotos});
			});		
	}	

	subscribe(callback) {
		PubSub.subscribe('timeline',(topic,{fotos}) => {						
			callback(fotos);
		});		
	}     
}