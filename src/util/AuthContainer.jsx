import {
    Navigate,
    Outlet
} from "react-router-dom";
import apiInstance from "./api";

const AuthContainer = () => {
    const token = localStorage.getItem('token')
    apiInstance.get('auth/verify').then((result) => {
        result.data.isVerified ? '' : localStorage.removeItem('token')
    })
    return (
        token ? <Outlet /> : <Navigate to='/' />
    );
};

export default AuthContainer;