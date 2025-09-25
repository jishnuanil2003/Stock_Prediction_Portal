import React from 'react'
import Button from './Button'

const Header = () => {
  return (
    <>
    <div className="flex justify-around py-8">
        <h1 className='font-bold text-lg md:text-xl'>Stock Prediction Portal</h1>
        <div className="flex gap-4">
            <Button name='Login'/>
            <Button name='Register'/>
        </div>    
    </div>
    </>
  )
}

export default Header
