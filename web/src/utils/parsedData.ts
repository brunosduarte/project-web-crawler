interface ITreeNode {
  name: string;
  url?: string;
  title?: string;
  done?: boolean;
  children: ITreeNode[];
}

// Recursive function to build the tree structure
function buildTree(node: any, parentDomain: string = ''): ITreeNode {
  // Ensure 'node.url' is defined; otherwise, fallback to an empty string
  const url = node.url || '';
  
  // Derive the node name from the URL or title, ensuring we don't attempt to call 'replace' on undefined
  const nodeName = url ? url.replace(parentDomain, '').split('/').filter(Boolean).pop() : node.title;

  const treeNode: ITreeNode = {
    name: nodeName,
    url: node.url,
    title: node.title,
    done: node.done,
    children: []
  };

  if (node.children && Array.isArray(node.children)) {
    treeNode.children = node.children.map((child: any) => buildTree(child, parentDomain));
  }

  return treeNode;
}

// Main function to parse data and build the tree
export const parsedData = (data: any): ITreeNode => {
  if (!data || typeof data !== 'object') {
    console.error('Invalid data format.');
    return { name: 'root', children: [] };
  }

  const domain = data.url || ''; // Ensure the domain is defined
  const rootNode: ITreeNode = { name: data.title || 'Root', children: [] };

  if (data.children && Array.isArray(data.children)) {
    rootNode.children = data.children.map((item: any) => buildTree(item, domain));
  }

  return rootNode;
};
