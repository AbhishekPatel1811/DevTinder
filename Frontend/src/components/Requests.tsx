import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { axiosInstance } from "@/lib/api"
import { addRequests, removeRequest } from "@/utils/requestSlice"
import { Check, X } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((store: any) => store.requests)
    const navigate = useNavigate()

    const reviewRequest = async (status: string, requestId: string) => {
        try {
            const res = await axiosInstance.post(`request/review/${status}/${requestId} `)
            console.log("reviewRequest----->", res.data.data)
            navigate("/connections")
            toast.success(`Request ${status}ed successfully`)
            dispatch(removeRequest(requestId))
        }
        catch (error) {
            console.log("error -->", error)
            toast.error(`Error ${status}ing request`)
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axiosInstance.get(`user/requests/received`)
            console.log("requests----->", res.data.data)
            dispatch(addRequests(res.data.data))
        }
        catch (error) {
            console.log("error -->", error)
            toast.error("Error fetching requests")
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    if (!requests) return
    if (requests.length === 0) return <h1 className="text-2xl font-bold text-center mt-10">No requests received</h1>

    return (
        <div className="flex flex-col justify-center items-center my-10">
            <h1 className="text-3xl font-bold">Requests Received</h1>
            <div className="mt-4 w-full max-w-lg mx-auto space-y-4">
                {requests?.map((request: any) => {
                    return (
                        <div key={request._id} className="flex justify-start items-center gap-4 w-full border border-gray-300 rounded-lg p-4">
                            <Avatar className="size-20 object-fit object-top rounded-full">
                                <AvatarImage src={request?.fromUserId?.photoUrl} className="object-cover object-top" />
                                <AvatarFallback className="border border-gray-300 text-sm font-medium uppercase">
                                    {request?.fromUserId?.firstName.charAt(0)}
                                    {request?.fromUserId?.lastName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                                <h2 className="text-lg font-bold">{request?.fromUserId?.firstName} {request?.fromUserId?.lastName}</h2>
                                <p className="text-sm text-gray-400">{request?.fromUserId?.about}</p>
                                {request?.fromUserId?.age && request?.fromUserId?.gender &&
                                    <p className="text-sm text-gray-500">{`${request?.fromUserId?.age} years old, ${request?.fromUserId?.gender === "male" ? "Male" : request?.fromUserId?.gender === "female" ? "Female" : "Other"}`}
                                    </p>
                                }
                                {request?.fromUserId?.skills &&
                                    <p className="text-sm text-gray-500">{request?.fromUserId?.skills.join(", ")}</p>
                                }
                            </div>
                            <div className="flex items-center justify-end gap-4 ml-auto">
                                <button title="Accept" className="cursor-pointer flex items-center justify-center size-10 bg-white rounded-full"
                                    onClick={() => reviewRequest("accepted", request?._id?.toString())}>
                                    <Check className="size-8 text-green-500" strokeWidth={3} />
                                </button>
                                <button title="Reject" className="cursor-pointer flex items-center justify-center size-10 bg-white rounded-full"
                                    onClick={() => reviewRequest("rejected", request?._id?.toString())}>
                                    <X className="size-8 text-red-500" strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
};

export default Requests;
