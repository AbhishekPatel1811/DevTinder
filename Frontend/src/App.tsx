import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import Body from "./components/Body"
import Feed from "./components/Feed"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Signup from "./components/Signup"
import { appStore } from "./utils/appStore"

function App() {

    return (
        <>
            <Provider store={appStore}>
                <Toaster position="bottom-right" />
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Body />} >
                            <Route path="/" element={<Feed />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default App

