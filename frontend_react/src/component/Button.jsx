import React from 'react'

const Button = ({ name }) => {
  return (
    <>
      {name === 'Login' ? (
        <button className='border-2 border-blue-400 px-4 text-sm md:px-8 py-1 font-semibold rounded-md cursor-pointer hover:bg-blue-400 ease-in duration-100'>
          {name}
        </button>
      ) : name === 'Register' ? (
        <button className='bg-blue-400 px-4 text-sm md:px-8 py-1 font-semibold rounded-md'>
          {name}
        </button>
      ) : null}
    </>
  )
}

export default Button