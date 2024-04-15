
import AdminNavbar from "../components/AdminNavbar";
import AddUser from "../components/AddUser";

const AddUserPage = () => {
    return (
        <div className="flex h-screen">
            <AdminNavbar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AddUser />
            </div>
        </div>
    )
}

export default AddUserPage;