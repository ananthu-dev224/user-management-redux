import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getUsers, deleteUser } from '../services/adminServices';
import { fetchUsers, deleteUserState } from '../app/adminSlice';


const Table = () => {
  const [allUsers, setAllUsers] = useState([])
  const [prefix, setPrefix] = useState('')
  const [change, setChange] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users } = useSelector((state) => state.admin)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin')
    }
    const fetchData = async () => {
      try {
        const result = await getUsers();
        dispatch(fetchUsers(result.users));
        setAllUsers(result.users)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [change])

  useEffect(() => {
    console.log(prefix);
    const regex = new RegExp(`^${prefix}`, "i")
    const filteredUser = users.filter((user) => regex.test(user.username))
    setAllUsers(filteredUser)
  }, [prefix, dispatch])


  const handleDelete = async (userId) => {
    try {
      const result = await deleteUser(userId)
      dispatch(deleteUserState(result))
      setChange(true)
      toast.success('User Deleted Successfully!')
    } catch (error) {
      toast.error('An error occured')
      console.error('An error occured in delete', error.message)
    }
  }

  return (

    <div className="flex flex-col w-full">
      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setPrefix(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      {/* Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allUsers.length === 0 ? (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="4">No users found</td>
                    </tr>
                  ) : (
                    allUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                          <button className="text-red-600 hover:text-red-900 ml-2" onClick={() => handleDelete(user._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
