import axios from 'axios'
// const url = 'http://localhost:9000/api/'
const url = 'http://learningportalbackend.kwintechnologies.com:3600/api/'
const storeToken = localStorage.getItem('token')

const apiInstance = axios.create({
  withCredentials:true,
  baseURL: url,
  // headers: {
  //   Authorization: `Bearer ${storeToken}`
  // }
})

apiInstance.interceptors.request.use(
  config => {
    if (storeToken) {
      config.headers['Authorization'] = `Bearer ${storeToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default apiInstance
