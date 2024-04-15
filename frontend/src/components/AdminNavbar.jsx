import {useCallback} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";


const AdminNavbar = () => {
    const navigate = useNavigate()
    const logoutAdmin = useCallback(() => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    }, [navigate]);

    return (
        <div className="flex h-screen bg-gray-800">
            {/* Sidebar */}
            <div className="flex flex-col w-64">
                {/* Sidebar component */}
                <div className="flex flex-col h-full bg-gray-800 text-white">
                    <div className="flex items-center justify-center h-16 bg-gray-900">
                        {/* Logo */}
                        <img
                            className="h-16 w-full"
                            src="https://previews.123rf.com/images/rashadashurov/rashadashurov1909/rashadashurov190905040/130215689-administration-infographic-10-steps-circle-design-management-schedule-presentation-corporation-icons.jpg"
                            alt="Workflow"
                        />
                    </div>
                    <nav className="flex-1">
                        <ul className="mt-6">
                            {/* Dashboard link */}
                            <li className="px-4 py-2 hover:bg-gray-700">
                                <Link to="/dashboard" className="block">
                                    <span className="text-sm font-medium">Dashboard</span>
                                </Link>
                            </li>
                            {/* Add User link */}
                            <li className="px-4 py-2 hover:bg-gray-700">
                                <Link to="/add-user" className="block">
                                    <span className="text-sm font-medium">Add User</span>
                                </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-700">
                                <button className="block" onClick={logoutAdmin}>
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}


export default AdminNavbar;