import { BrowserRouter, data, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import './styles/App.css'
import { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const userContext = createContext();

function Homepage() {
  return (
    <>
      <HomePage />
    </>
  )
}

function Loginpage() {
  return (
    <>
      <LoginPage />
    </>
  )
}

function Signuppage() {
  return (
    <>
      <SignupPage />
    </>
  )
}

function User_Dashboard_Page() {
  return (
    <>
      <UserDashboard />
    </>
  )
}

function Admin_Dashboard_Page() {
  return (
    <>
      <AdminDashboard />
    </>
  )
}

function App() {

  const [userData, setUserData] = useState({});
  const [dashboardData, setDashboardData] = useState({
    admin: {
      totalVehicles: 0,
      activeUsers: 0,
      registeredUsers: 0
    },
    user: {
      activeVehicles: 0,
      completedBookings: 0,
      pendingBookings: 0
    }
  });


  // fetching user details if Logged In
  const fetchuserdetail = useCallback(async () => {
    try {
      const res = await axios.post("http://localhost:3000/user/isAuthenticated", {}, { withCredentials: true });

      if (!res.data.success) {
        console.log("User is not authenticated");
        return;
      }

      if (res.data.success) {
        const USER = await axios.post("http://localhost:3000/user/user_details", {}, { withCredentials: true });

        if (!USER.data.success) {
          console.log(USER.data.message || "Failed to fetch user details");
          return;
        }

        if (USER.data.success) {
          const userdata = USER.data.userdata;

          setUserData(userdata.data);
          if (userdata.data.role === 'admin') {
            setDashboardData((prev => ({
              ...prev,
              admin: {
                totalVehicles: userdata.TVCounts,
                activeUsers: userdata.AUCounts,
                registeredUsers: userdata.RUCounts
              }
            })));

          }
          else {
            setDashboardData((prev => ({
              ...prev, user: {
                activeVehicles: userdata.AVCounts,
                completedBookings: userdata.CBCounts,
                pendingBookings: userdata.PBCounts
              }
            })));
          }
        }
        else {
          console.log(res.data.message)
        }
      }
      else {
        console.log("Some Error Occoured in fetching user details...")
      }

    } catch (error) {
      console.log(error.message)
    }
  }, []);

  useEffect(() => {
    fetchuserdetail();
  }, [fetchuserdetail]);


  return (
    <>
      <userContext.Provider value={{ userData, dashboardData, refreshUser: fetchuserdetail }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/auth/login' element={<Loginpage />} />
            <Route path='/auth/signup' element={<Signuppage />} />
            <Route path='/user/dashboard' element={<User_Dashboard_Page />} />
            <Route path='/admin/dashboard' element={<Admin_Dashboard_Page />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
export { userContext }