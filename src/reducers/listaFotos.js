export default function listaFotos(state=[],action){
    if(action.type === 'LISTAGEM') {
        return action.fotos;
    }

    if(action.type === 'LIKE') {
        const {likeada,fotoId,liker} = action;
        const fotoAchada = state.filter(foto => foto.id === fotoId)[0];                        								
        if(likeada) {
            fotoAchada.likers.push(liker);
        } else {
            fotoAchada.likers = fotoAchada.likers.filter( liker => liker.login !== liker.login);
        }

        return state;       
    }
}