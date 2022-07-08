import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import mensajesActions from '../redux/actions/mensajesActions'

const Mensaje = ({ imagen, mensaje }) => {
    const { _id: id, mensaje: texto } = mensaje
    const { userName, _id: userId } = mensaje.identificadorPersona
    const [editable, setEditable] = useState(false);
    const [mensajeModificado, setMensajeModificado] = useState(texto);
    const [respuestas, setRespuestas] = useState([])
    const usuario = useSelector(store => store.authReducer.usuario)
    const dispatch = useDispatch();
    const eliminarMensaje = () => {
        dispatch(mensajesActions.borrarMensaje(id))
    }

    const editarMensaje = () => {
        if (!editable) {
            setEditable(true)
        } else {
            dispatch(mensajesActions.editarMensaje(mensajeModificado, id))
            setEditable(false)
        }

    }
    const pedido = async () => {
        const res = await dispatch(mensajesActions.obtenerRespuestas(id))
        setRespuestas(res)
    }
    useEffect(() => {
        pedido()
    }, [])

    const responderMensaje = async () => {
        const respuestaAEnviar = prompt("Escribi tu respuesta:")
        if (!!respuestaAEnviar) {
            const res = await dispatch(mensajesActions.cargarRespuesta(respuestaAEnviar, id))
            setRespuestas(res)
        }
    }
    console.log(respuestas)
    return (
        <div className="mensaje">
            <div className="mensaje-perfil">

                <img src={imagen} alt="fotoperfil" className="fotoperfil" />
                <h3>{userName}</h3>
            </div>
            <div className="mensaje-texto">
                {
                    editable ?
                        <input type="text" className="input-mensaje" onChange={(e) => setMensajeModificado(e.target.value)} value={mensajeModificado} />
                        : <p>{texto}</p>
                }
                {
                    usuario._id === userId ?
                        <div className="mensaje-btn-container">
                            <button onClick={eliminarMensaje}>Eliminar</button>
                            <button onClick={editarMensaje}>{!editable ? "Editar" : "✅"}</button>
                        </div>
                        :
                        <div className="mensaje-btn-container">
                            <button onClick={responderMensaje}>Responder</button>

                        </div>

                }
            </div>
            <div>
                {
                    respuestas.map(respuesta => (
                        <div>
                            <p>El usuario: {respuesta.identificadorPersonaRespuesta.userName}</p>
                            <p>Respondio tu mensaje con: {respuesta.mensajeRespuesta}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Mensaje