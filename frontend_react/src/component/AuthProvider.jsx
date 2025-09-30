import React from 'react'
import { useState,useContext, createContext } from 'react'

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [isLoggedin,setIsLoggedin] = useState(!!localStorage.getItem('accessToken'))
  return (
    <AuthContext.Provider value={{isLoggedin,setIsLoggedin}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export  {AuthContext}
