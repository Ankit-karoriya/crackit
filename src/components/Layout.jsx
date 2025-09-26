import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Layout
