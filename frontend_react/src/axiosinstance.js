import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosinstance = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type':'application/json'
    }
})

// Response instance 
axiosinstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        console.log(config)
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

//Response instance

axiosinstance.interceptors.response.use(
    function(response){
        return response
    },
    async function(error){
        const orginalRequest = error.config;
        if(error.response.status === 401 && !orginalRequest.retry){
            orginalRequest.retry = true;
            const refreshToken = localStorage.getItem('refreshToken')
            try {
                const response = await axiosinstance.post('/token/refresh/',{refresh:refreshToken})
                console.log(response.data.access)
                localStorage.setItem('accessToken',response.data.access)
                orginalRequest.headers['Authorization']= `Bearer ${response.data.access}`
                return axiosinstance(orginalRequest)
            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href='/login'
            }
        }
        return Promise.reject(error)
    }
)

export default axiosinstance