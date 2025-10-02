import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children}) => {
    const {isLoggedin} = useContext(AuthContext)
  return isLoggedin ? (
    children
  ):(
    <Navigate to="/login"/>
  ) 
}

export default PrivateRoute
