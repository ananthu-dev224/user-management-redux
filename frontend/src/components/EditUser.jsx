import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useState, useRef, useEffect } from "react";
import { addUser } from "../services/adminServices";
import { addUserState } from "../app/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editUser } from "../services/adminServices";


const Edituser = ({ isOpen, toggleEdit, user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const handleEdit = async (e) => {
        e.preventDefault();
        const formData = {id:user[0]._id,username:name,email,phone}

        try {
            await editUser(formData);
            toast.success('user updated successfully');
            toggleEdit()
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        }

    };




    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={toggleEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={user[0].username}
                                />
                            </div>
                            {/* Phone Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="text"
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={user[0].phone}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email"
                                    placeholder={user[0].email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            {/* Submit Button */}
                            <button type="submit"
                                onClick={(e) => handleEdit(e)}
                                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Edit User
                            </button>
                        </form>
                    </div>
                </div>)}
        </>
    )

};

export default Edituser;
