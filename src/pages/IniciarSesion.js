import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../redux/actions/authActions'

import Inputs from '../components/Inputs'
import Header from "../components/Header";
import { toast } from 'react-toastify'

const IniciarSesion = () => {

    const dispatch = useDispatch();
    const usuario = useSelector(store => store.authReducer.usuario)

    const handleSubmit = async (userName, password) => {
        const errores = await dispatch(authActions.iniciarSesion(userName, password))
        console.log(errores)
        if (errores.errores) {
            errores.errores.map(e => toast(e.message, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            }))
        }
    }

    return (
        <div className="container">
            <Header nombreUsuario={usuario.userName} />
            <h1 style={{ width: '100%', textAlign: 'center' }}> Inicia sesión</h1>
            <main className="main-formulario">
                <Inputs data={{ first: 'Usuario', second: 'Constraseña' }} handleSubmit={handleSubmit} />
            </main>
        </div>
    )
}



export default IniciarSesion