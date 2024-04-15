import React, { useState, useEffect } from 'react';
import { IoLogoGoogle } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { loginUser , fetchUserProfile} from '../services/userServices';
import { fetchProfile } from '../app/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            navigate('/');
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error('Please enter both email and password.')
        }
        const userData = { email, password }
        const result = await loginUser(userData)
        if (result.userToken) {
            navigate('/')
            const result = await fetchUserProfile()
            dispatch(fetchProfile(result.user))
        }
    };

    return (
        <div className="flex justify-center items-center mt-16">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                <div className="flex items-center justify-evenly">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <IoLogoGoogle className='w-10 h-9 hover:cursor-pointer' />
                </div>
                <div className="flex items-center justify-center mt-5">
                    <span className="text-gray-600 mr-1">New user?</span>
                    <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link>
                </div>
            </form>

        </div>
    );
};

export default Login;
