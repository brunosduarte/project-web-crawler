import { useEffect } from 'react';

interface SiteMapNode {
  done: boolean;
  url: string;
  title: string;
  children?: SiteMapNode[];
}

// Custom hook to generate and download the sitemap
export function useExportSitemap(treeData: SiteMapNode) {
  useEffect(() => {
    const urls = extractUrls(treeData);
    const xmlContent = generateSitemapXml(urls);
    downloadSitemap(xmlContent, treeData.title);
  }, [treeData]); // Dependency array to re-run the effect if treeData changes

  function extractUrls(node: SiteMapNode, urls: string[] = []): string[] {
    if (node.done) {
      urls.push(node.url);
    }
    node.children?.forEach(child => extractUrls(child, urls));
    return urls;
  }

  function generateSitemapXml(urls: string[]): string {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    urls.forEach(url => {
      xmlContent += '<url>';
      xmlContent += `<loc>\${url}</loc>`;
      xmlContent += '</url>';
    });
    xmlContent += '</urlset>';
    return xmlContent;
  }

  function downloadSitemap(xmlContent: string, domain: string) {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `\sitemap_\${domain.replace(/[^a-zA-Z]/g, '_')}.xml\``;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


// import { useEffect } from 'react';

// interface SiteMapNode {
//   done: boolean;
//   url: string;
//   title: string;
//   children?: SiteMapNode[];
// }

// export function exportSitemap(treeData: SiteMapNode) {
//   useEffect(() => {
//     const urls = extractUrls(treeData);
//     const xmlContent = generateSitemapXml(urls);
//     downloadSitemap(xmlContent, treeData.title);
//   }, []);

//   function extractUrls(node: SiteMapNode, urls: string[] = []): string[] {
//     if (node.done) {
//       urls.push(node.url);
//     }
//     node.children?.forEach(child => extractUrls(child, urls));
//     return urls;
//   }

//   function generateSitemapXml(urls: string[]): string {
//     let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
//     xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
//     urls.forEach(url => {
//       xmlContent += '<url>';
//       xmlContent += `<loc>${url}</loc>`;
//       xmlContent += '</url>';
//     });
//     xmlContent += '</urlset>';
//     return xmlContent;
//   }

//   function downloadSitemap(xmlContent: string, domain: string) {
//     const blob = new Blob([xmlContent], { type: 'application/xml' });
//     const href = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = href;
//     link.download = `sitemap_${domain.replace(/[^a-zA-Z]/g, '_')}.xml`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// };


// import { useState, useEffect } from 'react';
// import { SiteMapUrl } from '@/entities/types';

// export function exportSitemap(domain: string) {
//   const [urls, setUrls] = useState<SiteMapUrl[]>([]);

//   useEffect(() => {
//     fetch('../src/storage/data.json')
//       .then(response => response.json())
//       .then(data => {
//         setUrls(data[domain]);
//       });
//   }, []);

//   const generateSitemapXml = (urls: SiteMapUrl[]) => {
//     let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
//     xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
//     urls.forEach(url => {
//       xmlContent += '<url>';
//       xmlContent += `<loc>${url.loc}</loc>`;
//       xmlContent += `<lastmod>${url.lastmod}</lastmod>`;
//       xmlContent += '</url>';
//     });
//     xmlContent += '</urlset>';
//     return xmlContent;
//   };

//   const downloadSitemap = () => {
//     const xmlContent = generateSitemapXml(urls);
//     const blob = new Blob([xmlContent], { type: 'application/xml' });
//     const href = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = href;
//     link.download = `sitemap_${domain}.xml`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return downloadSitemap
// };