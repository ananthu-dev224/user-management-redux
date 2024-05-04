// Admin API functions here
import api from '../utils/api';
import { toast } from 'react-toastify'


export const loginAdmin = async (adminData) => {
    try {
        const response = await api.post('/admin', adminData);
        if (response.data) {
            localStorage.setItem('adminToken', response.data.adminToken)
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }
};

export const deleteUser = async (userId) => {
    try {
        const adminToken = localStorage.getItem('adminToken')
        await api.delete(`/dashboard/remove-user/${userId}`, {
            headers: {
                'Authorization': `${adminToken}`
            }
        }
        );
        return userId;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
            localStorage.removeItem('adminToken')
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }
};

export const addUser = async (userData) => {
    try {
        const adminToken = localStorage.getItem('adminToken')
        const response = await api.post('/add-user', userData, {
            headers: {
                'Authorization': `${adminToken}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.info);
            localStorage.removeItem('adminToken')
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }
};

export const getUsers = async () => {
    try {
        const adminToken = localStorage.getItem('adminToken')
        const response = await api.get('/dashboard', {
            headers: {
                'Authorization': `${adminToken}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
            localStorage.removeItem('adminToken')
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }
};

export const editUser = async (userData) => {
    try {
        const adminToken = localStorage.getItem('adminToken')
        const response = await api.put('/dashboard/edit-user', userData, {
            headers: {
                'Authorization': `${adminToken}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.info);
            localStorage.removeItem('adminToken')
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }
};

