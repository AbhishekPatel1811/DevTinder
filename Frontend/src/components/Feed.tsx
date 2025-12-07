import { axiosInstance } from "@/lib/api";
import { addFeed } from "@/utils/feedSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((store: any) => store.feed)
    const API_URL = import.meta.env.VITE_API_URL

    const getFeed = async () => {
        if (feed) return
        try {
            const res = await axiosInstance.get(`${API_URL}/user/feed`)
            dispatch(addFeed(res.data.data))
        }
        catch (error) {
            console.log("Feed error", error)
        }
    }
    console.log("Feed data", feed)

    useEffect(() => {
        getFeed()
    }, [])

    return (feed && (
        <UserCard user={feed} />
    )
    )
};

export default Feed;