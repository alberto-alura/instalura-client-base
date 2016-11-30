import PubSub from 'pubsub-js';

export default class TimelineAction {

    constructor(listaFotos){
        this.listaFotos = listaFotos;
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
}