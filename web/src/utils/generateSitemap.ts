import { ISiteMapNode } from '@/entities/ISitemapNode'

export function extractUrls(
  node: ISiteMapNode,
  urls: Set<string> = new Set(),
): Set<string> {
  if (node.done) {
    urls.add(node.url)
  }
  node.children?.forEach((child) => extractUrls(child, urls))
  return urls
}

export function generateSitemapXml(urls: Set<string>): string {
  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>'
  xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  urls.forEach((url) => {
    xmlContent += '<url>'
    xmlContent += `<loc>${url}</loc>`
    xmlContent += '</url>'
  })
  xmlContent += '</urlset>'
  return xmlContent
}

export function downloadSitemap(xmlContent: string, domain: string) {
  const blob = new Blob([xmlContent], { type: 'application/xml' })
  const href = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  link.download = `sitemap_${domain}.xml`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportSitemap(data: ISiteMapNode) {
  const urls = extractUrls(data)
  const xmlContent = generateSitemapXml(urls)
  const domain = new URL(data.url).host
  downloadSitemap(xmlContent, domain)
}
