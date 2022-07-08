import Home from './pages/Home';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from 'react-router-dom';
import Registro from './pages/Registro'
import IniciarSesion from './pages/IniciarSesion'
import { useSelector } from 'react-redux';

function App() {
  const usuario = useSelector(store => store.authReducer.usuario) 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {usuario.userName === '' && <Route path="/registro" element={<Registro />} />}
        {usuario.userName === '' && <Route path="/inicioSesion" element={<IniciarSesion />} />}
        <Route path="/*" element={<Home />} />
      </Routes>
      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
