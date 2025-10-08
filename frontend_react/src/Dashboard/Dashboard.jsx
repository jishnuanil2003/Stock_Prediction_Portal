import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosinstance from '../axiosinstance'
import { ToastContainer, toast } from 'react-toastify'

const Dashboard = () => {
    const [ticker, setTicker] = useState("")
    const [error, setError] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const [plot,setPlot] = useState('')
    const [dma_100,setDma_100] = useState('')
    const [dma_200,setDma_200] = useState('')
    const [predicted_plot,setPredicted_plot] = useState('')
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosinstance.get('/protectedView/')
            } catch (error) {
                console.log(error);
            }
        }
        fetchProtectedData()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axiosinstance.post('/predict/', {
                'ticker': ticker
            })
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plotUrl = `${backendRoot}/${response.data.plot_img}`
            const dmaPlotUrl = `${backendRoot}/${response.data.plot_img_100DMA}`
            const dma200PlotUrl = `${backendRoot}/${response.data.plot_img_200DMA}`
            const predicted_plotUrl = `${backendRoot}/${response.data.plot_predicted_plot}`
            console.log("Plot path from backend:", response.data); 
            setPlot(plotUrl)
            setDma_100(dmaPlotUrl)
            setDma_200(dma200PlotUrl)
            setPredicted_plot(predicted_plotUrl)
            console.log(response.data)
            if (response.data.error) {
                setError(response.data.error)
            }
        } catch (error) {
            console.log("There is an error in making API call ", error);

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className='flex flex-col justify-center items-center min-h-[calc(100vh-180px)]'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center border border-blue-500 md:p-18 p-6 rounded-md'>
                    <h1 className='md:text-2xl text-xl font-bold mb-4'>Stock Prediction Form</h1>
                    <input className="flex-grow bg-transparent text-white placeholder-gray-600 border border-white pr-18 pl-3 py-2 uppercase" type="text" placeholder='Enter stock ticker' onChange={(e) => { setTicker(e.target.value) }} />
                    <small>{error && <div className='text-red-600 mt-2'>{error}</div>}</small>
                    {isloading ? (<button type='submit' className='bg-blue-400 px-4 text-sm md:px-8 py-1 font-semibold rounded-sm mt-4 disabled'>Please wait ...</button>) : (<button type='submit' className='bg-blue-400 px-4 text-sm md:px-8 py-1 font-semibold rounded-sm mt-4'>See Prediction</button>)}
                </form>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {plot && <div className='mb-5'><img className='w-full h-auto' src={plot}/></div>}
                    {dma_100 && <div className='mb-5'><img className='w-full h-auto' src={dma_100}/></div>}
                    {dma_200 && <div className='mb-5'><img className='w-full h-auto' src={dma_200}/></div>}
                    {predicted_plot && <div className='mb-5'><img className='w-full h-auto' src={predicted_plot}/></div>}
                </div>
        </>
    )
}

export default Dashboard
