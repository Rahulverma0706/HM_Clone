
import { useContext } from 'react'
import { AuthContext } from '../Context/ContextProvider'
import Login from '../Pages/Login'

const PrivateRoute = ({children}) => {
    const {isLogin, setIsLogin} = useContext(AuthContext)
    if(!isLogin){
        alert('Login First')
    }
  return (
    
     isLogin ? children : <Login/>
     
  ) 
}

export default PrivateRoute
