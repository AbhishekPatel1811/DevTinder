import { CodeXml, Menu } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((store: any) => store.user)
    console.log("user -->", user);

    return (
        <section className="px-6 py-4">
            <div className="container">
                {/* Desktop Menu */}
                <nav className="hidden items-center justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <div className="flex items-center gap-2 justify-start">
                            <Link to="/">
                                <span className="flex items-center gap-2 font-semibold">
                                    <CodeXml className="size-5 shrink-0" />
                                    DevTinder
                                </span>
                            </Link>
                        </div>
                    </div>
                    {user && (
                        <div className="flex flex-col gap-3">
                            <Link to="/profile">
                                <Avatar>
                                    <AvatarImage src={user.photoUrl} />
                                    <AvatarFallback>
                                        {user.firstName.charAt(0)}
                                        {user.lastName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2 justify-start">
                            <Link to="/">
                                <span className="flex items-center gap-2 font-semibold">
                                    <CodeXml className="size-5 shrink-0" />
                                    DevTinder
                                </span>
                            </Link>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <div className="flex items-center gap-2 justify-start">
                                            <span className="flex items-center gap-2 font-semibold">
                                                <CodeXml className="size-5 shrink-0" />
                                                DevTinder
                                            </span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-6 p-4">
                                    {user && (
                                        <div className="flex flex-col gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.photoUrl} />
                                                <AvatarFallback>
                                                    {user.firstName.charAt(0)}
                                                    {user.lastName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;

