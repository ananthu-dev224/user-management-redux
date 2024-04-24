import React,{useState , useCallback} from 'react';
import { FaEdit } from 'react-icons/fa';
import EditProfile from './EditProfile';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const UserProfile = () => {
  
    const [showEdit,setShowEdit] = useState(false)
    const {profile,profileImg} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const logoutUser = useCallback(() => {
        localStorage.removeItem('userToken');
        navigate('/login');
    }, [navigate]);
    return (
        <div className='main'>
            <h2>Profile</h2>
            <div className="card">
                <div className="card-body">
                    <FaEdit className='edit' onClick={() => setShowEdit(true)} />
                    <div className="flex-shrink-0">
                        <img src={profileImg ? profileImg :'https://via.placeholder.com/150'} alt="Profile" className="h-40 w-40 rounded-full border-4 border-white" />
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>{profile && profile.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{profile &&profile.email}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>:</td>
                                <td>{profile &&profile.phone}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='text-lg bg-gray-500 hover:bg-gray-600 text-slate-200 p-2 rounded ' onClick={logoutUser}>Logout</button>
                </div>
            </div>
            {showEdit && <EditProfile  setShowEdit={setShowEdit}/>}
        </div>
    );
}


export default UserProfile;