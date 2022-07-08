
const initialState = {
    mensajes:[],
    usuario:{userName:''},
}

const filtroReducer = (state = initialState, action)=>{

    switch(action.type){
        case 'fetch':
            return {
                ...state,
                mensajes: action.payload,
            }
            
        case 'delete':
            return {
                ...state,
                mensajes: action.payload
            }

        case 'cargarMensaje':
            
            return{
                ...state,
                mensajes:action.payload
            }

        default:
            return state
    }


}
export default filtroReducer