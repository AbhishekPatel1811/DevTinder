import { axiosInstance } from "@/lib/api";
import { addFeed, clearFeed } from "@/utils/feedSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((store: any) => store.feed)
    const user = useSelector((store: any) => store.user)
    const previousUserIdRef = useRef<string | null>(null)

    const getFeed = async () => {
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
        const currentUserId = user?._id

        // Only refetch if user ID changed (new user logged in)
        if (currentUserId && currentUserId !== previousUserIdRef.current) {
            dispatch(clearFeed())
            getFeed()
            previousUserIdRef.current = currentUserId
        } else if (!currentUserId) {
            // User logged out, reset the ref
            previousUserIdRef.current = null
        }
    }, [user?._id, dispatch])

    if (!feed) return

    if (feed.length <= 0) return <h1 className="text-xl font-bold text-center mt-10">No new users found!!!</h1>

    return (
        feed && (
            <div className="flex items-center justify-center pt-4 pb-6">
                <UserCard user={feed[0]} showButtons={true} />
            </div>
        )
    )
};

export default Feed;