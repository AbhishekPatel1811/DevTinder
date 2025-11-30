
interface MenuItem {
    title: string;
    links: {
        text: string;
        url: string;
    }[];
}

interface Footer2Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    tagline?: string;
    menuItems?: MenuItem[];
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
}


const Footer = ({
    logo = {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
        alt: "blocks for shadcn/ui",
        title: "DevTinder",
        url: "https://www.shadcnblocks.com",
    },
    tagline = "Platform for developer to connect with each other.",
    copyright = "© 2025 DevTinder. All rights reserved.",
}: Footer2Props) => {
    return (
        <section className="px-6 py-4">
            <div className="container">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <a href={logo.url}>
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        title={logo.title}
                                        className="h-10 dark:invert"
                                    />
                                    <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                                </a>
                            </div>
                            <p className="mt-2 text-sm font-medium tracking-wide">{tagline}</p>
                        </div>
                    </div>
                    <div className="text-muted-foreground mt-4 flex flex-col justify-between gap-4 border-t pt-4 text-sm font-medium md:flex-row md:items-center">
                        <p>{copyright}</p>
                    </div>
                </footer>
            </div>
        </section>
    );
};


export default Footer
