import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import LoginPage from "./pages/LoginPage"
import SignupPage from './pages/SignupPage'
import AdminLoginPage from './pages/AdminLoginPage'
import UserProfilePage from './pages/UserProfilePage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import Dashboard from './pages/Dashboard';
import AddUserPage from './pages/AddUserPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {Provider} from 'react-redux'
import store from './store/store'

function App() {


  return (
    <>
      <ToastContainer />
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/signup' Component={SignupPage} />
          <Route path='/admin' Component={AdminLoginPage} />
          <Route path='/profile' Component={UserProfilePage} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/add-user' Component={AddUserPage} />
          <Route path='*' Component={NotFound}/>
        </Routes>
      </Router>
      </Provider>
    </>
  )
}

export default App
