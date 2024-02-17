//import { hierarchy, HierarchyNode } from 'd3-hierarchy';

export interface SiteMapNode {
  name: string;
  children?: SiteMapNode[];
}

export const parsedData = (domain: string, urls: { loc: string; lastmod: string }[]): SiteMapNode => {
  const rootNode: SiteMapNode = { name: domain, children: [] };

  urls.forEach(urlObj => {
    //console.log("urlObj",urlObj, urls)
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

// Example usage:
// Assuming `data` is your loaded JSON data and 'example.com' is the domain you're focusing on

