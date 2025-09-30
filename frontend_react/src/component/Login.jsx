import React, { useState,useContext } from 'react'
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from './AuthProvider';


const Login = () => {
    const navigate = useNavigate()
    const [isloading, setIsloading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setError] = useState('')
    const {isLoggedin,setIsLoggedin} = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)
        const userData = { username, password }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            setIsLoggedin(true)
            navigate('/')
        } catch (error) {
            console.log(error);
            setError("invalid credential")
            if (error) {
                toast.error(errors, {
                    position: "top-center",
                    autoClose: 3000, // closes after 3s
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        } finally {
            setIsloading(false)
        }
    }
    return (
        <>
            <div className="flex items-center justify-center  h-[calc(100vh-180px)]">
                <div className="relative w-96 p-8 pt-16 rounded-3xl bg-[#5050504a] bg-opacity-25  shadow-2xl glass-bg">

                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-[#000000] flex items-center justify-center shadow-xl">
                        <i className="fas fa-user text-white text-4xl"></i>
                    </div>

                    <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
                        <div className="flex items-center p-3 mb-4 rounded-lg bg-white bg-opacity-40">
                            <i className="fas fa-user-circle text-gray-700 mr-3"></i>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text"
                                placeholder="Username"
                                className="flex-grow bg-transparent text-gray-800 placeholder-gray-600 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center p-3 mb-6 rounded-lg bg-white bg-opacity-40">
                            <i className="fas fa-lock text-gray-700 mr-3"></i>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password"
                                placeholder="Password"
                                className="flex-grow bg-transparent text-gray-800 placeholder-gray-600 focus:outline-none"
                                required
                            />
                        </div>
                        {isloading ? (<button disabled className='px-4 py-2 md:px-8 md:py-2 bg-blue-400 mx-auto mb-8 rounded-md'>Please wait...</button>) : (<button className='px-4 py-2 md:px-8 md:py-2 bg-blue-400 mx-auto mb-8 rounded-md'>Login</button>)}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login
