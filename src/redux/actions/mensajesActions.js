import axios from 'axios';

const filtroActions = {

    fetchearMensajes: () => {
        return async (dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/mensajes')
            // .then(res => dispatch({type:'fetch', payload:res.data.respuesta}))
            dispatch({ type: 'fetch', payload: res.data.respuesta })
        }
    },
    borrarMensaje: (id) => {
        return async (dispatch, getState) => {
            const token = localStorage.getItem('token')
            try {

                const res = await axios.delete('http://localhost:4000/api/mensajes/' + id, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                console.log(res)
                dispatch({ type: 'delete', payload: res.data.respuesta })

            } catch (err) {
                console.log(err)
            }
        }
    },
    cargarMensaje: (mensaje, identificadorPersona) => {
        return async (dispatch, getState) => {
            const token = localStorage.getItem('token')
            const respuesta = await axios.post('http://localhost:4000/api/mensajes', { mensaje, identificadorPersona }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({ type: 'cargarMensaje', payload: respuesta.data.respuesta })

        }
    },
    editarMensaje: (mensaje, idMensaje) => {
        return async (dispatch, getState) => {
            const token = localStorage.getItem('token')
            const respuesta = await axios.put('http://localhost:4000/api/mensajes/' + idMensaje, { mensaje }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({ type: 'cargarMensaje', payload: respuesta.data.respuesta })

        }
    },
    cargarRespuesta: (respuesta, idMensaje) => {
        return async (dispatch, getState) => {
            const token = localStorage.getItem('token')
            const res = await axios.post('http://localhost:4000/api/respuesta', { respuesta, idMensaje }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return(res.data.respuesta)

        }
    },
    obtenerRespuestas: (idMensaje) => {
        return async (dispatch, getState) => {
            // const token = localStorage.getItem('token')
            const res = await axios.get('http://localhost:4000/api/respuesta/'+idMensaje)
            // dispatch({ type: 'cargarMensaje', payload: res.data.respuesta })
            console.log(res)
            return res.data.respuesta

        }
    }


}

export default filtroActions;