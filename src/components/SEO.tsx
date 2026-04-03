import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
}

export function SEO({ title, description, ogImage }: SEOProps) {
  useEffect(() => {
    // Update page title
    document.title = `${title} | Giovanni Morelli - Full Stack Developer`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update OG tags
    if (ogImage) {
      const metaOgImage = document.querySelector('meta[property="og:image"]');
      if (metaOgImage) {
        metaOgImage.setAttribute('content', ogImage);
      }
    }
  }, [title, description, ogImage]);

  return null;
}
