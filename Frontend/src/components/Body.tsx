import { axiosInstance } from '@/lib/api';
import { addUser } from '@/utils/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { toast } from 'sonner';

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store: any) => store.user)

    const fetchUser = async () => {
        if (userData) return
        try {
            console.log("calling profile/view API")
            const res = await axiosInstance.get("/profile/view")
            dispatch(addUser(res.data))
        }
        catch (err: any) {
            if (err.response.status === 401) {
                toast.error("Unauthorized: Please login again")
                navigate("/login")
            }
            console.log("error -->", err);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <Navbar />
            <main className="flex flex-col grow min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Body
