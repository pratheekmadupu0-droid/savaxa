import { useEffect } from 'react';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogType = 'website', 
  ogImage = 'https://savaxa.in/assets/logo.png',
  schema 
}) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // Helper to add/update meta tags
    const updateMetaTag = (name, property, content) => {
      if (!content) return;
      let tag = name 
        ? document.querySelector(`meta[name="${name}"]`) 
        : document.querySelector(`meta[property="${property}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        if (name) tag.setAttribute('name', name);
        if (property) tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Description & Keywords
    updateMetaTag('description', null, description);
    updateMetaTag('keywords', null, keywords);

    // 3. Open Graph Tags
    updateMetaTag(null, 'og:title', title);
    updateMetaTag(null, 'og:description', description);
    updateMetaTag(null, 'og:type', ogType);
    updateMetaTag(null, 'og:image', ogImage);
    updateMetaTag(null, 'og:url', canonical || window.location.href);
    updateMetaTag(null, 'og:site_name', 'SAVAXA');

    // 4. Twitter Cards
    updateMetaTag('twitter:card', null, 'summary_large_image');
    updateMetaTag('twitter:title', null, title);
    updateMetaTag('twitter:description', null, description);
    updateMetaTag('twitter:image', null, ogImage);

    // 5. Canonical Link
    const canonicalUrl = canonical || window.location.href;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Schema Markup
    let schemaScript = document.getElementById('jsonld-schema');
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'jsonld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Optional cleanup if necessary
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schema]);

  return null;
}
