class CustomErrorHandler {
    // should accept axios response
    static getErrorMessage (axiosResponse) {
        return axiosResponse.response.data.message
    }

    static getStatusCode (axiosResponse) {
        return axiosResponse.response.status
    }

    static getStatusText (axiosResponse) {
        return axiosResponse.response.statusText
    }
}

export default CustomErrorHandler