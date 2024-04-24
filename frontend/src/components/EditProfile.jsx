import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import { useSelector, useDispatch } from "react-redux";
import { editUserProfile } from '../services/userServices';
import { fetchProfile,pfpChange } from '../app/userSlice';
import { toast } from 'react-toastify';

const EditProfile = ({ setShowEdit }) => {

    const [username, setUserName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)



    const [image, setImage] = useState()
    const { profile, profileImg } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleClose = () => {
        setShowEdit(false);
    };

    const handleSubmit = async () => {
        if (!image) {
            return toast.info('Choose a Profile Image');
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('image', image);

        try {
            const updatedProfile = await editUserProfile(formData);
            dispatch(fetchProfile(updatedProfile.userData))
            dispatch(pfpChange(updatedProfile.url))
            setShowEdit(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }

    }

    return (
        <>

            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white shadow-md rounded-lg p-4 w-96 relative">
                    <button
                        className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={handleClose}
                    >
                        <FaTimes /> {/* Close icon */}
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                    <div className="flex justify-center mb-6">
                        <img src={image ? URL.createObjectURL(image) : profileImg || 'https://via.placeholder.com/150'}  className="h-40 w-40 rounded-full border-4 border-white" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder={profile && profile.username}
                            onChange={(e) => setUserName(e.target.value)}

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder={profile && profile.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phoneNumber"
                            type="tel"
                            placeholder={profile &&profile.phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
                            Profile Image
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            name='image'
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditProfile;
