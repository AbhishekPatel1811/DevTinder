import { axiosInstance } from "@/lib/api"
import { addConnections } from "@/utils/connectionSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store: any) => store.connections)

    const fetchConnections = async () => {
        try {
            const res = await axiosInstance.get(`/user/connections`)
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))
        }
        catch (error) {
            console.log("error -->", error)
            toast.error("Error fetching connections")
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return
    if (connections.length === 0) return <h1 className="text-2xl font-bold text-center mt-10">No connections found</h1>

    return (
        <div className="flex flex-col justify-center items-center py-8">
            <h1 className="text-3xl font-bold">Connections</h1>
            <div className="mt-4 w-full max-w-lg mx-auto space-y-4">
                {connections?.map((connection: any) => {
                    return (
                        <div key={connection._id} className="flex justify-start items-start gap-2 w-full border border-gray-300 rounded-lg p-4">
                            <Avatar className="size-20 object-fit object-top rounded-full">
                                <AvatarImage src={connection.photoUrl} className="object-cover object-top" />
                                <AvatarFallback className="border border-gray-300 text-sm font-medium uppercase">
                                    {connection.firstName.charAt(0)}
                                    {connection.lastName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                                <h2 className="text-lg font-bold">{connection.firstName} {connection.lastName}</h2>
                                <p className="text-sm text-gray-400">{connection.about}</p>
                                {connections?.age && connections?.gender &&
                                    <p className="text-sm text-gray-500">{`${connection.age} years old, ${connection.gender === "male" ? "Male" : connection.gender === "female" ? "Female" : "Other"}`}
                                    </p>
                                }
                                <p className="text-sm text-gray-500">{connection.skills.join(", ")}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
};

export default Connections;
