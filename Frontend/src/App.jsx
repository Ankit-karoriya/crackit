import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import UploadPaper from './components/UploadPaper.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import Layout from './components/Layout.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { AuthProvider, AuthContext } from './context/AuthContext.jsx'

function Auth() {
  const {auth} = useContext(AuthContext);
  console.log(auth);
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={auth ? <HomePage/> : <Navigate to='/login'/>} />
          <Route path='/upload' element={<UploadPaper />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Route>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
  )
}

function App(){
  return (
    <AuthProvider>
      <Auth/>
    </AuthProvider>
  )
}

export default App
