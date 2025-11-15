import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import UploadPaper from './components/UploadPaper.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import Layout from './components/Layout.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { AuthProvider, AuthContext } from './context/AuthContext.jsx'
import { AlertContext, AlertProvider } from './context/AlertContext.jsx'
import Alert from './components/Alert.jsx'

function Auth() {
  const { auth } = useContext(AuthContext);
  const { alert } = useContext(AlertContext);
  return (
    <>
      <Alert alertStatus={alert.status} message={alert.message} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={auth ? <HomePage /> : <Navigate to='/login' />} />
          <Route path='/upload' element={<UploadPaper />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Route>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Auth />
      </AlertProvider>
    </AuthProvider>
  )
}

export default App
