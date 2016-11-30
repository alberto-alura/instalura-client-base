export function listagem(fotos){
    return {type:'LISTAGEM',fotos};    
}

export function like(fotoId,likeada,liker){
    return {type:'LIKE',fotoId,likeada,liker};    
}

export function comentario(fotoId,novoComentario){
    return {type:'COMENTARIO',fotoId,novoComentario}    
}

