
import { Check, X } from "lucide-react";

export const UserCard = ({ feedData }: { feedData: any }) => {
    return (
        <div>
            <div className="grid grid-cols-1 max-w-md w-full mx-auto gap-4">
                {feedData?.map((item: any) => {
                    return (
                        <div>
                            <div className="aspect-16/20 relative flex items-center justify-center overflow-hidden rounded-lg">
                                <img src={item?.photoUrl} alt={item?.firstName} className="rounded-lg object-cover size-full" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 h-full bg-linear-to-t from-black via-black/30 to-transparent text-white">
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-4 py-6 space-y-1 text-white">
                                    <h2 className="text-3xl font-semibold tracking-wide">{item?.firstName} <span className="font-extralight">{item?.age}</span></h2>
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
}