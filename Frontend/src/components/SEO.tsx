import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  imageUrl?: string;
  url?: string;
}

export default function SEO({
  title = "DevTinder | Tinder for Developers",
  description = "A modern platform for developers to connect, match, and collaborate with each other. Explore profiles, send connection requests, and build your professional network.",
  name = "DevTinder",
  type = "website",
  imageUrl = "/logo.png",
  url = "/",
}: SEOProps) {
  const siteUrl =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const toAbsoluteUrl = (value: string) => {
    if (!siteUrl || value.startsWith("http")) return value;
    return `${siteUrl.replace(/\/$/, "")}/${value.replace(/^\//, "")}`;
  };

  const absoluteUrl = toAbsoluteUrl(url);
  const absoluteImageUrl = toAbsoluteUrl(imageUrl);

  return (
    <Helmet>
      { /* Standard metadata tags */ }
      <title>{title}</title>
      <meta name='description' content={description} />
      
      { /* Open Graph metadata tags */ }
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:image' content={absoluteImageUrl} />
      <meta property='og:url' content={absoluteUrl} />
      <meta property='og:site_name' content={name} />

      { /* Twitter Card metadata tags */ }
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={'summary_large_image'} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={absoluteImageUrl} />
      
      { /* Additional Best Practices SEO Metadata */ }
      <meta name="keywords" content="developers, networking, coding, connection, devtinder, matching, collaborate, skills" />
      <link rel="canonical" href={absoluteUrl} />
    </Helmet>
  );
}
