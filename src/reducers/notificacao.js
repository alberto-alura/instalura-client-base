export default function notificacao(state='',action){
    if(action.type === 'ALERT') {
        return action.msg;
    }

    if(action.type === 'ALERT_FINALIZADO'){
        return '';
    }

    return state;
}