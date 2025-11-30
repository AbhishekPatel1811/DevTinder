import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Body = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex flex-col grow">
                <div className="flex-1 flex flex-col">
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default Body
