export interface SiteMapNode {
  name: string;
  children?: SiteMapNode[];
}

export const parsedData = (domain: string, urls: { loc: string; lastmod: string }[]): SiteMapNode => {
  const rootNode: SiteMapNode = { name: domain, children: [] };

  if (!Array.isArray(urls)) {
    console.error('parsedData function expects \'urls\' to be an array.');
    return rootNode;
  }

  urls.forEach((urlObj) => {
    const pathSegments = urlObj.loc.replace(domain, '').split('/').filter(Boolean);
    let currentNode = rootNode;
    pathSegments.forEach(segment => {
      if (!currentNode.children) {
        currentNode.children = [];
      }

      let childNode = currentNode.children.find(child => child.name === segment);

      if (!childNode) {
        childNode = { name: segment, children: [] };
        currentNode.children.push(childNode);
      }

      currentNode = childNode;
    });
  });

  return rootNode;
};