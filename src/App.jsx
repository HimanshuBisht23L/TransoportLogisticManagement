import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
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

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/auth/login' element={<Loginpage />} />
          <Route path='/auth/signup' element={<Signuppage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
