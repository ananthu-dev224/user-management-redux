import React, { useState , useEffect } from 'react';
import { IoLogoGoogle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useDispatch } from 'react-redux'

import { signupUser , fetchUserProfile} from '../services/userServices';
import { fetchProfile } from '../app/userSlice';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            navigate('/');
        }
    }, [navigate])  

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username || !email || !phoneNumber || !password || !confirmPassword) {
            return toast.error('Please fill in all fields.')
        } else if (password !== confirmPassword) {
            return toast.error('Passwords do not match.')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
           return toast.error('Email is not valid')
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
            return toast.info('Password should contain an upper case , lower case , digit and an special character')
        }
        const userData = {username,email,phoneNumber,password}
        const result = await signupUser(userData)
        if(result.userToken){
            navigate('/')
          const result = await fetchUserProfile()
          dispatch(fetchProfile(result.user))
        }
    };



    return (
        <div className="flex justify-center items-center mt-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2" onSubmit={handleSignUp}>
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-2">
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
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Phone Number
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phoneNumber"
                        type="number"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="mb-2">
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-evenly">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <IoLogoGoogle className='w-10 h-9 hover:cursor-pointer' />
                </div>
                <div className="flex items-center justify-center mt-5">
                    <span className="text-gray-600 mr-1">Already existing user?</span>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
