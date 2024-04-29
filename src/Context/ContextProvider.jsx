import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext();

const ContextProvider = ({children}) => {
    const[isLogin, setIsLogin] = useState(false);
    
  return (
    <div>
      <AuthContext.Provider value={{isLogin, setIsLogin}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export {ContextProvider}
export {AuthContext}
