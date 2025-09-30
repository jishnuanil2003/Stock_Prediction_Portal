import React from 'react'
import Header from './component/Header'
import Body from './component/Body'
import Footer from './component/Footer'
import{BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './component/Register'
import Login from './component/Login'
import AuthContext from './component/AuthProvider'
const App = () => {
  return (
    <>
    <AuthContext>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route element={<Body/>} path='/'/>
    <Route element={<Register/>} path='/register'/>
    <Route element={<Login/>} path='/login'/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </AuthContext>
    </>
  )
}

export default App
