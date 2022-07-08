const axios = require('axios')

const authActions = {

    registrarUsuario: (userName,password) =>{
        return async(dispatch, getState)=>{
            try {
                // eslint-disable-next-line
                const user = await axios.post('http://localhost:4000/api/auth/signUp',{userName,password})
                
                if(user.data.success && !user.data.error){
                    localStorage.setItem('token',user.data.response.token)
                    dispatch({type:'usuario', payload:user.data.response.usuario})
                    return {errores: [{message:"Successfully logged in"}]}
                }else{
                    // alert(user.data.error)
                    console.error(user.data.response)
                    return {errores: user.data.errores}
                }
            }catch(error){
                console.log(error)
            }
        }
    },
    iniciarSesion: (userName,password) => {
        return async(dispatch, getState)=>{
            try {
                const user = await axios.post('http://localhost:4000/api/auth/signIn',{userName, password})
                if(user.data.success && !user.data.error){
                    localStorage.setItem('token',user.data.response.token)
                    dispatch({type:'usuario', payload:user.data.response.usuario})
                    return {errores: [{message:"Successfully logged in"}]}
                }else{
                    console.log(user.data)
                    return {errores: [{message:"error trying to sign in"}]}

                }
            }catch(error){
                console.error(error)
            }
        }
    },
    logOut: () => {
        return (dispatch, getState)=>{
            localStorage.clear()
            dispatch({type:'logOut', payload:{}})
        }
    }
}

export default authActions