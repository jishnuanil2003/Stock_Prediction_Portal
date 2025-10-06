import React from 'react'
import Header from './component/Header'
import Body from './component/Body'
import Footer from './component/Footer'
import{BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './component/Register'
import Login from './component/Login'
import AuthContext from './component/AuthProvider'
import Dashboard from './Dashboard/Dashboard'
import PrivateRoute from './component/PrivateRoute'
import PublicRoute from './component/PublicRoute'
const App = () => {
  return (
    <>
    <AuthContext>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route element={<Body/>} path='/'/>
    <Route element={<PublicRoute><Register/></PublicRoute>} path='/register'/>
    <Route element={<PublicRoute><Login/></PublicRoute>} path='/login'/>
    <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} path='/dashboard'/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </AuthContext>
    </>
  )
}

export default App
