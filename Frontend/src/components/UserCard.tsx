

export const UserCard = ({ user }: { user: any }) => {
    return (
        <div>
            <div className="grid grid-cols-1 max-w-md w-full mx-auto gap-4">
                {user?.map((item: any, index: number) => {
                    return (
                        <div key={item?._id || `user-${index}`}>
                            <div className="aspect-16/20 relative flex items-center justify-center overflow-hidden rounded-lg">
                                {item?.photoUrl ? (
                                    <img src={item.photoUrl} alt={item?.firstName || "User"} className="rounded-lg object-cover object-top size-full" />
                                ) : (
                                    <div className="rounded-lg object-cover size-full bg-gray-200 flex items-center justify-center text-gray-400 w-96 h-120">
                                        No Photo
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 h-full bg-linear-to-t from-black via-black/30 to-transparent text-white">
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-4 py-6 space-y-1 text-white">
                                    <h2 className="text-3xl font-semibold tracking-wide">{item?.firstName} <span className="font-extralight">{item?.age}</span></h2>
                                    <p title={item?.about} className="text-sm line-clamp-2">{item?.about}</p>
                                    <div className="flex items-center gap-2">
                                        {/* Show upto only 2 skills */}
                                        <span className="text-sm">Skills:{" "}
                                            <span className="font-bold">
                                                {Array.isArray(item?.skills)
                                                    ? item.skills.slice(0, 2).join(", ")
                                                    : (item?.skills || "No skills listed")}
                                                {item.skills.length > 2 && <span className="text-xs text-gray-500">...</span>}
                                            </span>
                                        </span>
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