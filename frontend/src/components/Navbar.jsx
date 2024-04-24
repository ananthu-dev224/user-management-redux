import React, { useState, useEffect } from 'react';
import { FaBars, FaUser } from 'react-icons/fa'; // Assuming you want to use FaBars as the menu icon
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useDispatch } from 'react-redux';
import { fetchProfile , pfpChange} from '../app/userSlice';
import { fetchUserProfile } from '../services/userServices';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        let token = localStorage.getItem('userToken')
        if (!token) {
            navigate('/login')
        }

        const fetchData = async () => {
            try {
                const result = await fetchUserProfile();
                dispatch(fetchProfile(result.user));
                dispatch(pfpChange(result.url));
                console.log(result.user.url)
            } catch (error) {
                navigate('/login')
                console.error("Error fetching user:", error.message);
            }
        };

        fetchData();
    }, [])



    return (
        <nav>
            <div className='bg-gray-500 rounded-lg h-16 m-5 flex justify-between items-center px-6 relative'>
                {/* Navigation Links */}
                <ul className={`hidden md:flex flex-grow justify-center ${showMenu ? 'hidden' : 'block'}`}>
                    <li className='inline-block px-6'><Link to='/' className='font-bold text-white text-lg hover:text-gray-200'>Home</Link></li>
                    <li className='inline-block px-6'><Link to='/services' className='font-bold text-white text-lg hover:text-gray-200'>Services</Link></li>
                    <li className='inline-block px-6'><Link to='/about' className='font-bold text-white text-lg hover:text-gray-200'>About</Link></li>
                    <li className='inline-block px-6'><Link to='/contact' className='font-bold text-white text-lg hover:text-gray-200'>Contact</Link></li>
                </ul>

                {/* Profile Icon */}
                <p className='font-bold text-white text-lg hover:text-gray-200 hover:cursor-pointer md:mr-0' style={{ position: 'absolute', right: '1rem' }}><Link to='/profile'><FaUser /></Link></p>

                {/* Menu Icon for Small Screens */}
                <div className="md:hidden">
                    <FaBars className="text-white text-2xl cursor-pointer" onClick={toggleMenu} />
                </div>

                {/* Dropdown Menu for Small Screens */}
                {showMenu && (
                    <div className="md:hidden absolute top-10 left-0 w-full rounded-lg bg-gray-500 rounded-b-lg py-2">
                        <ul className="text-center">
                            <li className='block px-6 py-2'><Link to='/' className='font-bold text-white text-lg hover:text-gray-200'>Home</Link></li>
                            <li className='block px-6 py-2'><Link to='/services' className='font-bold text-white text-lg hover:text-gray-200'>Services</Link></li>
                            <li className='block px-6 py-2'><Link to='/about' className='font-bold text-white text-lg hover:text-gray-200'>About</Link></li>
                            <li className='block px-6 py-2'><Link to='/contact' className='font-bold text-white text-lg hover:text-gray-200'>Contact</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
