import { axiosInstance } from "@/lib/api";
import { addFeed } from "@/utils/feedSlice";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
    const [feedData, setFeedData] = useState<any>()
    const dispatch = useDispatch()
    const feed = useSelector((store: any) => store.feed)
    const API_URL = import.meta.env.VITE_API_URL

    const getFeed = async () => {
        if (feed) return
        try {
            const res = await axiosInstance.get(`${API_URL}/user/feed`)
            setFeedData(res.data.data)
            dispatch(addFeed(res.data.data))
        }
        catch (error) {
            console.log("Feed error", error)
        }
    }
    console.log("Feed data", feedData)

    useEffect(() => {
        getFeed()
    }, [])

    return (feed && (
        <div>
            <div className="grid grid-cols-1 max-w-md w-full mx-auto gap-4">
                {feedData.map((item: any) => {
                    return (
                        <div>
                            <div className="aspect-16/20 relative flex items-center justify-center overflow-hidden rounded-lg">
                                <img src={item?.photoUrl} alt={item?.firstName} className="rounded-lg object-cover size-full" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 h-full bg-linear-to-t from-black via-black/30 to-transparent text-white">
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-4 py-6 space-y-1 text-white">
                                    <h2 className="text-2xl font-bold">{item?.firstName} <span className="font-normal">{item?.age}</span></h2>
                                    <p className="text-sm line-clamp-2">{item?.about}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Skills:{" "}<span className="font-bold">{item?.skills?.join(", ")}</span></span>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 mt-4">
                                        <button title="Like" className="cursor-pointer flex items-center justify-center size-10 bg-white rounded-full">
                                            <Check className="size-8 text-green-500" strokeWidth={3} />
                                        </button>
                                        <button title="Dislike" className="cursor-pointer flex items-center justify-center size-10 bg-white rounded-full">
                                            <X className="size-8 text-red-500" strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
    )
};

export default Feed;