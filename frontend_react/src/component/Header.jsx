import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import {useContext } from 'react'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate()
  const {isLoggedin,setIsLoggedin} = useContext(AuthContext)
  const handleLogout = ()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedin(false)
    navigate('/login')
  }
  return (
    <>
        <div className="fixed top-0 left-0 w-full flex justify-around py-8 z-50 ">
        <Link  className='font-bold text-lg md:text-xl'>Stock Prediction Portal</Link>
        <div className="flex gap-4">
          {isLoggedin ?(
            <button className='border-2 border-blue-400 px-4 text-sm md:px-8 py-1 font-semibold rounded-md cursor-pointer hover:bg-blue-400 ease-in duration-100' onClick={handleLogout}>Logout</button>
          ):(
            <>
            <Button name='Login' url = '/login'/>
            <Button name='Register' url ='/register'/>
            </>
          )}
        </div>    
    </div>
    </>
  )
}

export default Header
