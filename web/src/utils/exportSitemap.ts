import React, { useState, useEffect } from 'react';
import { SiteMapUrl } from '../entities/types'; // Add this import statement


export function exportSitemap(domain: string) {
  const [urls, setUrls] = useState<SiteMapUrl[]>([]);

  useEffect(() => {
    fetch('../src/storage/data.json')
      .then(response => response.json())
      .then(data => {
        setUrls(data[domain]);
      });
  }, []);

  const generateSitemapXml = (urls: SiteMapUrl[]) => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    urls.forEach(url => {
      xmlContent += '<url>';
      xmlContent += `<loc>${url.loc}</loc>`;
      xmlContent += `<lastmod>${url.lastmod}</lastmod>`;
      xmlContent += '</url>';
    });
    xmlContent += '</urlset>';
    return xmlContent;
  };

  const downloadSitemap = () => {
    const xmlContent = generateSitemapXml(urls);
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `sitemap_${domain}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return downloadSitemap
};