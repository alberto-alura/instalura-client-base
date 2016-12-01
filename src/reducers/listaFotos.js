import {List} from 'immutable';

function trocaFoto(lista,fotoId,funcaoAtualizacao){
	const indiceFoto = lista.findIndex(foto => foto.id === fotoId);

	const fotoEstadoAtual = lista.get(indiceFoto);

	const novasPropriedes = funcaoAtualizacao(fotoEstadoAtual);

	const fotoNovoEstado = Object.assign({},
								fotoEstadoAtual,
								novasPropriedes);

	return lista.set(indiceFoto,fotoNovoEstado);									
}

export default function listaFotos(state=new List(),action){
    if(action.type === 'LISTAGEM') {
        return new List(action.fotos);
    }

    if(action.type === 'LIKE') {
        const {fotoId,liker} = action;
		return trocaFoto(state,fotoId,(foto) => {
			const likeada = !foto.likeada;			
			const novosLikers = likeada ? foto.likers.concat(liker) : foto.likers.filter(likerAtual => likerAtual.login !== liker.login);			
			return {likeada,likers : novosLikers};
		});             
    }

    if(action.type === 'COMENTARIO') {
        const {fotoId,novoComentario} = action;		
		return trocaFoto(state,fotoId,(foto) => {			
			return {comentarios : foto.comentarios.concat(novoComentario)};						
		});                    
    }

    return state;
}