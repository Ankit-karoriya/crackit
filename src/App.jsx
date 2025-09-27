import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import UploadPaper from './components/UploadPaper.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import Layout from './components/Layout.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/upload' element={<UploadPaper />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
