import React from 'react'
import Button from './Button'

const Body = () => {
  return (
    <>
    <div className=" flex flex-col justify-center items-center m-auto text-center h-[calc(100vh-180px)]">
    <div className="bg-[#2d2d2d] px-4 md:px-0  py-8 rounded-xl w-2/3 flex flex-col justify-center items-center">
        <h1 className='font-bold text-3xl text-center mb-8'>Stock Prediction Portal</h1>
        <p className='w-2/3 text-center mb-8'>This stock prediction application utilizes machine learning techniques, specifically employing Keras, and LSTM model, integrated within the Django framework. It forecasts future stock prices by analyzing 100-day and 200-day moving averages, essential indicators widely used by stock analysts to inform trading and investment decisions.</p>
        <Button name="Explore Dashboard" url='dashboard'/>
    </div>
    </div>
    </>
  )
}

export default Body
