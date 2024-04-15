import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { loginAdmin } from '../services/adminServices'
import { fetchUsers } from '../app/adminSlice';
import { getUsers } from '../services/adminServices';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'



const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error('Please complete all required fields before submitting the form.')
        }
        const adminData = {email,password}
        const result = await loginAdmin(adminData)
        if(result.adminToken){
            navigate('/dashboard')
            const result = await getUsers()
            dispatch(fetchUsers(result.users))
        }
    };
    return (
        <div className="flex justify-center items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-6 text-center">Admin</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>

                </div>
            </form>

        </div>
    );
};




export default AdminLogin;