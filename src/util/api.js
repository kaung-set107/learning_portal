import axios from "axios";
// const url = 'http://localhost:9000/api/'
// const url = "http://learningportalbackend.kwintechnologies.com:3600/api/";
const url = "http://localhost:3600/api/";
const CRMURL = "http://crmbackend.kwintechnologies.com:3500/api/";
const storeToken = localStorage.getItem("token");

export const CrmAPI = axios.create({
  withCredentials: true,
  baseURL: CRMURL,
  // headers: {
  //   Authorization: `Bearer ${storeToken}`
  // }
});

const apiInstance = axios.create({
  withCredentials: true,
  baseURL: url,
  // headers: {
  //   Authorization: `Bearer ${storeToken}`
  // }
});

apiInstance.interceptors.request.use(
  (config) => {
    if (storeToken) {
      config.headers["Authorization"] = `Bearer ${storeToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
