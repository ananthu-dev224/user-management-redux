import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useState } from "react";
import { addUser } from "../services/adminServices";
import { addUserState } from "../app/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const AddUser = () => {
    const [image, setImage] = useState(null)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !password || !image) {
            return toast.error('Please fill in all fields.')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return toast.error('Email is not valid')
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return toast.info('Password should contain an upper case , lower case , digit and an special character')
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('image', image);
        formData.append('password', password);
        const result = await addUser(formData)
        if (result) {
            navigate('/dashboard')
            toast.success('User added successfully!')
            dispatch(addUserState(result.newUser))
        }
    };





    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {/* Add User Form */}
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Add User</h2>
                <form className="space-y-4">
                    {/* Image Upload */}
                    <div className="flex items-center space-x-4">
                        {/* Rounded area for image */}
                        <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
                            {/* Image preview */}
                            <img src={image ? URL.createObjectURL(image) : 'https://via.placeholder.com/150'}  className="w-full h-full object-cover" />
                        </div>
                        {/* Upload button */}
                        <label className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                            <input type="file" name='image' className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                            Upload Image
                        </label>
                    </div>
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                         />
                    </div>
                    {/* Phone Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" 
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password"
                        onChange={(e) => setPassword(e.target.value)}
                         className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    {/* Submit Button */}
                    <button type="submit"
                    onClick={(e) => handleAdd(e)}
                     className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
