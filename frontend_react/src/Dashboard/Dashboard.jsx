import axios from 'axios'
import React,{useEffect} from 'react'
import axiosinstance from '../axiosinstance'

const Dashboard = () => {
    useEffect(() => {
        const fetchProtectedData = async()=>{
            try {
                const response = await axiosinstance.get('/protectedView/')
                console.log(response.data)
            } catch (error) {
                console.log(error);  
            }
        }
        fetchProtectedData()
    }, [])
  return (
    <div>
     
    </div>
  )
}

export default Dashboard
