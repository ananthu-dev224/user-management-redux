// User API functions here
import api from '../utils/api'
import {toast} from 'react-toastify'

export const signupUser = async (userData) => {
    try {
        const response = await api.post('/signup', userData);
        if (response.data) {
            localStorage.setItem('userToken', response.data.userToken)
        }
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
    }
};


export const loginUser = async (userData) => {
    try {
        const response = await api.post('/login', userData);
        if (response.data) {
            localStorage.setItem('userToken',response.data.userToken)
        }
        return response.data
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
    }
};


export const editUserProfile = async (userData) => {
    try {
        const userToken = localStorage.getItem('userToken')
        const response = await api.put('/edit-profile', userData, {
                    headers: { "Content-Type": "multipart/form-data" , 'Authorization':`${userToken}` }
                });
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
            localStorage.removeItem('userToken')
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
    }
};


export const fetchUserProfile = async () => {
    try {
        const userToken = localStorage.getItem('userToken')
        const response = await api.get('/profile',{
            headers:{
                'Authorization':`${userToken}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            localStorage.removeItem('userToken')
            toast.error(error.response.data.info);
          } else {
            toast.error('An unexpected error occurred. Please try again later.');
          }
    }
};
