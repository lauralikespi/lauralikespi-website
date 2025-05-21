// components/BlogMetadata.js
import Head from 'next/head';

export default function BlogMetadata({ post, url }) {
  // Set default values for SEO if post doesn't exist (for blog index page)
  const title = post ? `${post.title} | lauralikespi's Blog` : "lauralikespi's Blog";
  const description = post ? post.excerpt : "lauralikespi's thoughts on AI, technology, startups, and founder life";
  const imageUrl = post ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lauralikespi.com'}${post.image}` : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lauralikespi.com'}/images/default-blog-image.png`;
  const canonicalUrl = url ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lauralikespi.com'}${url}` : process.env.NEXT_PUBLIC_SITE_URL || 'https://lauralikespi.com';
  
  const metadata = {
    title: 'lauralikespi blog',
    description: "lauralikespi's thoughts on AI, technology, startups, and founder life",
    }

  return (
    <Head>
      {/* Basic Metadata */}
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="lauralikespi's Blog" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Optional: Author information */}
      {post && (
        <meta name="author" content={post.author} />
      )}
      
      {/* Optional: Keywords from topics */}
      {post && post.topics_array && (
        <meta name="keywords" content={post.topics_array.join(', ')} />
      )}
      
      {/* If there's a series, add structured data */}
      {post && post.series && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "image": [imageUrl],
              "datePublished": post.date,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "Laura Gemmell",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lauralikespi.com'}/images/pi-logo.png`
                }
              },
              "isPartOf": {
                "@type": "Series",
                "name": post.series,
              }
            })
          }}
        />
      )}
      
      {/* For regular posts without series */}
      {post && !post.series && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": [imageUrl],
              "datePublished": post.date,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "Laura Gemmell",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lauralikespi.com'}/images/pi-logo.png`
                }
              }
            })
          }}
        />
      )}
    </Head>
  );
}