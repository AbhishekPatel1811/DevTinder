import { CodeXml } from "lucide-react";

const Footer = () => {
    return (
        <section className="px-6 py-4">
            <div className="container">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 justify-start">
                                <span className="flex items-center gap-2 font-semibold">
                                    <CodeXml className="size-5 shrink-0" />
                                    DevTinder
                                </span>
                            </div>
                            <p className="mt-2 text-sm font-medium tracking-wide">Platform for developers to connect with each other.</p>
                        </div>
                    </div>
                    <div className="text-muted-foreground mt-4 flex flex-col justify-between gap-4 border-t pt-4 text-sm font-medium md:flex-row md:items-center">
                        <p>© 2025 DevTinder. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </section>
    );
};


export default Footer
