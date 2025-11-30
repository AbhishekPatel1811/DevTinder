import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/login"
import Body from "./components/Body"
import Profile from "./components/Profile"
import Footer from "./components/Footer"

function App() {

    return (
        <>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />} >
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/footer" element={<Footer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

