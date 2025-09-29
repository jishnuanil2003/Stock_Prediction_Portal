import React, { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const[isloading,setIsloading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)
        const userData = {
            username, email, password
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/register/", userData)
            console.log(response.data)
            if (response.data) {
                toast.success("🦄 Wow! Successfully registered!", {
                    position: "top-center",
                    autoClose: 3000, // closes after 3s
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setUsername('')
                setEmail('')
                setPassword('')
            }
            else {
                toast.error("🦄 Registration Unsuccessfull!", {
                    position: "top-center",
                    autoClose: 3000, // closes after 3s
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            setErrors(error.response.data)

        }finally{
            setIsloading(false)
        }
    }
    return (
        <>
            <div className=" flex flex-col justify-center items-center h-[calc(100vh-180px)]">
                <div className='bg-[#5050504a] flex flex-col text-center w-1/2 rounded-md'>
                    <h1 className='md:text-2xl text-xl font-bold mt-8'>Create an Account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="my-4">
                            <input className='border border-white px-4 py-2 md:mx-8 mx-2 rounded-md bg-[#1d1d1d]' type="text" placeholder='Username' name='username'  value={username} onChange={(e) => { setUsername(e.target.value) }} />
                            <small>{errors.username && <div className='text-red-600 text-sm'>{errors.username}</div>}</small>
                        </div>
                        <div className="mb-4">
                            <input className='border border-white px-4 py-2 md:mx-8 mx-2 rounded-md bg-[#1d1d1d]' type="email" placeholder='Email' name='email'  value={email} onChange={(e) => setEmail(e.target.value)} />
                            <small>{errors.email && <div className='text-red-600 text-sm'>{errors.email}</div>}</small>
                        </div>
                        <div className="mb-4">
                            <input className='border border-white px-4 py-2 md:mx-8 mx-2 rounded-md bg-[#1d1d1d]' type="password" placeholder='Password' name='password'  value={password} onChange={(e) => setPassword(e.target.value)} />
                            <small>{errors.password && <div className='text-red-600 text-sm'>{errors.password}</div>}</small>
                        </div>
                        {isloading ? (<button disabled className='px-4 py-2 md:px-8 md:py-2 bg-blue-400 mx-auto mb-8'>Please wait...</button>):(<button className='px-4 py-2 md:px-8 md:py-2 bg-blue-400 mx-auto mb-8'>Register</button>)}
                        <ToastContainer/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
