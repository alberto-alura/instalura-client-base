import PubSub from 'pubsub-js';

export default class TimelineStore {

    constructor(listaFotos){
        this.listaFotos = listaFotos;
    }

	lista(urlTimeline){
		fetch(urlTimeline)
			.then(response => {
				return response.json();
			})
			.then(fotos => {	
				this.listaFotos = fotos;			
				PubSub.publish("timeline",{fotos:this.listaFotos});
			});		
	}

    like(fotoId,likeada) {
		const requestInfo = {
			method:'POST'
		};

		fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
			.then(response => {
				if(response.ok){
					return response.json();											
				} else {
					console.error("nao foi possivel fazer o like/dislike");
				}
			})
			.then(liker => {
                const fotoAchada = this.listaFotos.filter(foto => foto.id === fotoId)[0];                								
				if(likeada) {
					fotoAchada.likers.push(liker);
				} else {
					fotoAchada.likers = fotoAchada.likers.filter( liker => liker.login !== liker.login);
				}                
                PubSub.publish("timeline",{fotos:this.listaFotos});                
			})        
    }

    comenta(fotoId,texto){
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
                const fotoAchada = this.listaFotos.filter(foto => foto.id === fotoId)[0];
                fotoAchada.comentarios = fotoAchada.comentarios.concat(novoComentario); 
                PubSub.publish("timeline",{fotos:this.listaFotos});                               												
			})
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
}