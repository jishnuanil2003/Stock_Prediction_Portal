import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ name,url }) => {
  return (
    <>
      {name === 'Login' ? (
        <button className='border-2 border-blue-400 px-4 text-sm md:px-8 py-1 font-semibold rounded-md cursor-pointer hover:bg-blue-400 ease-in duration-100'>
          <Link to={url}>
          {name}
          </Link>
        </button>
      ) : name === 'Register' ? (
        <button className='bg-blue-400 px-4 text-sm md:px-8 py-1 font-semibold rounded-md'>
          <Link to={url}>
          {name}
          </Link>
        </button>
      ) : name === 'Explore Dashboard' ? (
        <button className='bg-blue-400 px-4 text-sm md:px-8 py-2 font-semibold rounded-md'>
          <Link to={url}>
          {name}
          </Link>
        </button>):null}
    </>
  )
}

export default Button