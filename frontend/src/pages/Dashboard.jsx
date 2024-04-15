
import AdminNavbar from "../components/AdminNavbar";
import Table from "../components/Table";


const Dashboard = () => {
    return (
        <>
            <div className="flex h-screen">
                <AdminNavbar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Table />
                </div>
            </div>
        </>
    )
}




export default Dashboard;