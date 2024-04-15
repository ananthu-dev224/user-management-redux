import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const {profile} = useSelector((state) => state.user)
  return (
    <>
     <Navbar />
     <div className="text-center">
        <p className="font-bold text-lg">Welcome To Home {profile && profile.username} 👋</p>
     </div>
     <Footer />
    </>
  )
}

export default Home;