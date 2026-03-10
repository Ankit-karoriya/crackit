import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// pages
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import OtpVerify from './components/OtpVerify.jsx'
import Alert from './components/Alert.jsx'
import HomePage from './components/HomePage.jsx'
import UploadPaper from './components/UploadPaper.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import Layout from './components/Layout.jsx'
import User from './components/User.jsx'
import UserLayout from './components/UserLayout.jsx'
import UserUploadedPapers from './components/UserUploadedPapers.jsx'
import ViewPapers from './components/ViewPapers.jsx'

//contexts
import { AuthProvider, AuthContext } from './context/AuthContext.jsx'
import { AlertContext, AlertProvider } from './context/AlertContext.jsx'
import { PendingPaperProvider } from './context/PendingPapersContext.jsx'
import { ApprovedPaperProvider } from './context/ApprovedPapersContext.jsx'
import { RejectedPaperProvider } from './context/RejectedPapersContext.jsx'
import { UserDataProvider } from './context/userData.jsx'

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
          <Route path='/admin' element={
            <PendingPaperProvider>
              <RejectedPaperProvider>
                <AdminPanel />
              </RejectedPaperProvider>
            </PendingPaperProvider>} />

          <Route path="/user" element={<UserLayout />}>
            <Route index element={<User />} />
            <Route path="uploads" element={<UserUploadedPapers />} />
            <Route path="papers" element={<ViewPapers />} />
          </Route>

        </Route>
        <Route path='/register' element={<Signup />} />
        <Route path='/verify-otp' element={<OtpVerify />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <ApprovedPaperProvider>
          <Auth />
        </ApprovedPaperProvider>
      </AlertProvider>
    </AuthProvider>
  )
}

export default App
