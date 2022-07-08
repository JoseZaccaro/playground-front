import { combineReducers } from 'redux'
import mensajesReducer from './mensajesReducer'
import authReducer from './authReducer'
const mainReducer = combineReducers({

    mensajesReducer,
    authReducer

})

export default mainReducer
