
import axios from "axios"

import { BASE_URL } from "./apiPath"


const axiosInstance = axios.create({


    baseURL: BASE_URL,
    timeout: 10000,


})

axiosInstance.interceptors.request.use(


    (config) => {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }

    , (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(

    (response) => {
        return response
    }
    , (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }

        else if (error.response.status === 403) {

            alert("You are not authorized to access this resource")

            window.location.href = "/login"

        }


        return Promise.reject(error)
    }

)

export default axiosInstance