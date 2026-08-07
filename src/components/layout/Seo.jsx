import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../../constants/site.js';

function getCanonicalUrl(pathname) {
  const normalizedPath = pathname === '/' ? '' : pathname.replace(/^\/+/, '');
  return new URL(normalizedPath, SITE.url).toString();
}

function setNamedMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setPropertyMeta(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setCanonicalLink(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setOrganizationJsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logoUrl,
    email: SITE.email,
    telephone: SITE.phone,
    address: SITE.address,
  };

  let script = document.getElementById('organization-json-ld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'organization-json-ld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(organization);
}

export default function Seo({ title, description, canonicalUrl, image = SITE.logoUrl }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = canonicalUrl ?? getCanonicalUrl(pathname);

    document.title = title;
    setNamedMeta('description', description);
    setCanonicalLink(url);

    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:locale', 'es_GT');
    setPropertyMeta('og:site_name', SITE.name);
    setPropertyMeta('og:title', title);
    setPropertyMeta('og:description', description);
    setPropertyMeta('og:url', url);
    setPropertyMeta('og:image', image);

    setNamedMeta('twitter:card', 'summary_large_image');
    setNamedMeta('twitter:title', title);
    setNamedMeta('twitter:description', description);
    setNamedMeta('twitter:image', image);

    setOrganizationJsonLd();
  }, [canonicalUrl, description, image, pathname, title]);

  return null;
}
