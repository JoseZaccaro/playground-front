import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import mensajesActions from '../redux/actions/mensajesActions'
import Mensaje from './../components/Mensaje';

const url = 'https://images6.alphacoders.com/658/658723.png'

const Home = () => {
    const dispatch = useDispatch();
    const usuario = useSelector(store => store.authReducer.usuario)
    const mensajes = useSelector(store => store.mensajesReducer.mensajes)
    const [inputValue, setInputValue] = useState('')
    const inputHandler = (e) => {
        setInputValue(e.target.value)

    }

    useEffect(() => {
        dispatch(mensajesActions.fetchearMensajes())
    }, [])

    const submitHandler = (e) => {
        dispatch(mensajesActions.cargarMensaje(inputValue, usuario._id))
        setInputValue("")
    }

    console.log(mensajes)
    return (
        <div className="container">
            <Header />
            <main className="main-home">
                <div className="mensajes-container">
                    {
                        mensajes?.map(mensaje => (
                            <Mensaje mensaje={mensaje} imagen={url}/>
                        ))
                    }
                </div>
                <input type="text" className="input-mensaje" value={inputValue} onChange={inputHandler} />
                <button onClick={submitHandler} className="btn-send">enviar</button>
            </main>
        </div>);

}

export default Home;