import { axiosInstance } from "@/lib/api";
import { addFeed } from "@/utils/feedSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((store: any) => store.feed)

    const getFeed = async () => {
        if (feed) return
        try {
            console.log("calling user/feed API")
            const res = await axiosInstance.get(`/user/feed`)
            dispatch(addFeed(res.data.data))
        }
        catch (error) {
            console.log("Feed error", error)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    if (!feed) return

    if (feed.length <= 0) return <h1 className="text-xl font-bold text-center mt-10">No new users found!!!</h1>

    return (
        feed && (
            <div className="flex items-center justify-center mt-4 mb-16">
                <UserCard user={feed[0]} showButtons={true} />
            </div>
        )
    )
};

export default Feed;