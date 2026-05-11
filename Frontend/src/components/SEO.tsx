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
  imageUrl = "https://devstinderr.site/logo.png", // Assuming logo or generic fallback
  url = "https://devstinderr.site",
}: SEOProps) {
  return (
    <Helmet>
      { /* Standard metadata tags */ }
      <title>{title}</title>
      <meta name='description' content={description} />
      
      { /* Open Graph metadata tags */ }
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:url' content={url} />
      <meta property='og:site_name' content={name} />

      { /* Twitter Card metadata tags */ }
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={'summary_large_image'} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageUrl} />
      
      { /* Additional Best Practices SEO Metadata */ }
      <meta name="keywords" content="developers, networking, coding, connection, devtinder, matching, collaborate, skills" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
