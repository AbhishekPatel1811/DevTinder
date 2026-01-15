import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeXml, LogOut, Mail, UserPen, Users } from "lucide-react";

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
import { clearFeed } from "@/utils/feedSlice";
import { removeConnections } from "@/utils/connectionSlice";
import { clearRequests } from "@/utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store: any) => store.user)

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/logout")
            toast.success("Logged out successfully!!");
            dispatch(removeUser(null))
            dispatch(clearFeed())
            dispatch(removeConnections())
            dispatch(clearRequests())
            return navigate("/login")
        }
        catch (error) {
            console.log("error -->", error);
            toast.error("Error logging out");
        }
    }

    return (
        <section className="px-6 py-3 bg-muted mx-14 my-4 rounded-full">
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

                    <div className="flex items-center justify-between gap-4">
                        <ThemeToggle />
                        <div className="w-0.5 h-5 bg-gray-300" />
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="size-9 cursor-pointer">
                                        <AvatarImage src={user.photoUrl} className="object-cover object-top" />
                                        <AvatarFallback className="border border-gray-300 text-sm font-medium uppercase">
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
                                                <UserPen className="size-4 mr-2" />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/connections" >
                                                <Users className="size-4 mr-2" />
                                                Connections
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/requests" >
                                                <Mail className="size-4 mr-2" />
                                                Requests
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleLogout()}>
                                        <LogOut className="size-4 mr-2" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default Navbar;

