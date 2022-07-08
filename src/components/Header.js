import {Link} from 'react-router-dom';
import authActions from '../redux/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'


function Header(props) {

    const dispatch = useDispatch()
    const usuario = useSelector(store => store.authReducer.usuario) 
    return ( 
    <header>
        <nav>
            <Link to="/">Home</Link>
           {/* {usuario.userName !== '' && <Link to="/formulario">Formulario</Link>} */}
            {
                usuario.userName === '' ? (<>
                <Link to="/registro">Registro</Link>
                <Link to="/inicioSesion">Inicio sesion</Link>
                </>)
                :
                <Link to="/" onClick={()=>dispatch(authActions.logOut())}>Log out</Link>
            }
        </nav>
        {usuario.userName !== '' ? <h1>Bienvenido {usuario.userName}</h1> : <h1>No estas registrado</h1>}
    </header> );
}

export default Header;