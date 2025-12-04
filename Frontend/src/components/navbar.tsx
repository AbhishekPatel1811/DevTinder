import { CodeXml } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { axiosInstance } from "@/lib/api";
import { removeUser } from "@/utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store: any) => store.user)

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/logout", {}, { withCredentials: true })
            dispatch(removeUser(null))
            navigate("/login")
            toast.success("Logged out successfully!!");
        }
        catch (error) {
            console.log("error -->", error);
        }
    }

    return (
        <section className="px-6 py-4 bg-muted mx-14 my-4 rounded-full">
            <div className="container">
                {/* Desktop Menu */}
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <div className="flex items-center gap-2 justify-start">
                            <Link to="/">
                                <span className="flex items-center gap-2 text-xl font-semibold">
                                    <CodeXml className="size-5 shrink-0" />
                                    DevTinder
                                </span>
                            </Link>
                        </div>
                    </div>
                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="size-9 cursor-pointer">
                                    <AvatarImage src={user.photoUrl} className="object-cover" />
                                    <AvatarFallback className="border border-gray-300 text-sm font-medium">
                                        {user.firstName.charAt(0)}
                                        {user.lastName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48" align="end" side="top" sideOffset={10}>
                                <DropdownMenuLabel className="text-sm font-medium">
                                    <div className="grid flex-1 text-left text-sm leading-tight whitespace-nowrap space-y-1">
                                        <span className="text-sm font-medium leading-none tracking-wide">
                                            {user?.firstName + " " + user?.lastName || "User"}
                                        </span>
                                        <span
                                            title={user?.emailId || "internal@vedteq.com"}
                                            className="text-xs text-muted-foreground tracking-wide cursor-pointer"
                                        >
                                            {user?.emailId || "internal@vedteq.com"}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link to="/profile">
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleLogout()}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </nav>
            </div>
        </section>
    );
};

export default Navbar;

