import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import './styles/App.css'


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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/auth/login' element={<Loginpage />} />
          <Route path='/auth/signup' element={<Signuppage />} />
          <Route path='/user/dashboard' element={<User_Dashboard_Page />} />
          <Route path='/admin/dashboard' element={<Admin_Dashboard_Page />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
