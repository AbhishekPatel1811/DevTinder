import { CodeXml } from "lucide-react";

const Footer = () => {
    return (
        <section className="border-t-2 bg-background px-6 py-4">
            <div className="container">
                <footer>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <span className="text-xl flex items-center gap-2 font-semibold">
                                <CodeXml className="size-5 shrink-0" />
                                DevTinder
                            </span>
                            <p className="text-sm font-medium tracking-wide">Platform for developers to connect with each other.</p>
                        </div>
                        <div className="text-muted-foreground mt-4 flex flex-col justify-between gap-4 pt-4 text-sm font-medium md:flex-row md:items-center">
                            <p>© 2025 DevTinder. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};


export default Footer
