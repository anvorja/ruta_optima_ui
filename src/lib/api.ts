// src/lib/api.ts
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add a request interceptor if needed (e.g., for auth tokens)
api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors here (e.g., 401 Unauthorized)
        return Promise.reject(error)
    }
)

export default api
