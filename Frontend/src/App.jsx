import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import UploadPaper from './components/UploadPaper.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import Layout from './components/Layout.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/upload' element={<UploadPaper />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Route>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
