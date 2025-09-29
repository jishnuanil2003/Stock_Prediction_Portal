import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className="flex justify-around py-8">
        <Link to='/' className='font-bold text-lg md:text-xl'>Stock Prediction Portal</Link>
        <div className="flex gap-4">
            <Button name='Login' url = '/login'/>
            <Button name='Register' url ='/register'/>
        </div>    
    </div>
    </>
  )
}

export default Header
