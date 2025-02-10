import { useState } from 'react'
import { createContext } from 'react'
import PropTypes from 'prop-types';


const AuthContext = createContext();

const ContextProvider = ({name, children}) => {
    const[isLogin, setIsLogin] = useState(false);
    
  return (
    <div>
      <h1>{name}</h1>
      <AuthContext.Provider value={{isLogin, setIsLogin}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
ContextProvider.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node, // ✅ Fix: Add 'children' validation
};


export {ContextProvider}
export {AuthContext}
