export default function listaFotos(state=[],action){
    if(action.type === 'LISTAGEM') {
        return action.fotos;
    }
}