import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { axiosInstance } from "@/lib/api"
import { removeUserFromFeed } from "@/utils/feedSlice"
import { Heart, X } from "lucide-react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export const UserCard = ({ user, showButtons = true }: { user: any, showButtons?: boolean }) => {
    const dispatch = useDispatch()

    // Accept/ Reject user from feed
    const handleSendRequest = async (userId: any, status: string) => {
        try {
            const res = await axiosInstance.post(`/request/send/${status}/${userId}`)
            console.log("Request sent", res.data.data)

            toast.success(res?.data?.message || `${status}ed successfully`)
            dispatch(removeUserFromFeed(userId))

        } catch (error: any) {
            console.log(`Error ${status}ing user`, error)
            toast.error(error?.response?.data?.message || `Error ${status}ing user`)
        }
    }

    return (
        <div className="max-w-md w-full">
            <div className="aspect-16/20 relative flex users-center justify-center overflow-hidden rounded-lg mb-4">
                {user?.photoUrl ? (
                    <img src={user.photoUrl} alt={user?.firstName || "User"} className="rounded-lg object-cover object-top size-full" />
                ) : (
                    <div className="rounded-lg object-cover size-full bg-gray-200 flex users-center justify-center text-gray-400">
                        No Photo
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 h-full bg-linear-to-t from-black via-black/30 to-transparent text-white">
                </div>
                <div className="absolute bottom-6 left-0 right-0 px-4 py-6 space-y-1 text-white">
                    <h2 className="text-3xl font-semibold tracking-wide">{user?.firstName} <span className="font-extralight">{user?.age}</span></h2>
                    <p title={user?.about} className="w-72 max-w-md text-sm line-clamp-2">{user?.about}</p>
                    <div className="flex users-center gap-2">
                        {/* Show upto only 2 skills */}
                        <span className="text-sm">Skills:{" "}
                            {user.skills.length > 0 ? (
                                <span className="font-bold">
                                    {Array.isArray(user?.skills)
                                        ? user.skills.slice(0, 2).join(", ")
                                        : (user?.skills || "No skills listed")}
                                    {user.skills.length > 2 && <span className="text-xs text-gray-500">...</span>}
                                </span>
                            ) : (
                                <span className="text-sm text-gray-500">No skills listed</span>
                            )}
                        </span>
                    </div>
                </div>
                {showButtons && (
                    <div className="absolute bottom-6 right-0 p-4">
                        <div className="flex items-center justify-end gap-4 ml-auto">
                            {/* Accept button with tooltip */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="cursor-pointer flex items-center justify-center size-10 bg-white rounded-full"
                                        onClick={() => handleSendRequest(user?._id, "like")}
                                    >
                                        <Heart className="size-6 text-green-800" fill="green" strokeWidth={3} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" align="center">
                                    <span>Like</span>
                                </TooltipContent>
                            </Tooltip>
                            {/* Reject button with tooltip */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="cursor-pointer flex items-center justify-center size-10 bg-white rounded-full"
                                        onClick={() => handleSendRequest(user?._id, "dislike")}
                                    >
                                        <X className="size-6 text-red-500" fill="red" strokeWidth={5} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" align="center">
                                    <span>Dislike</span>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}