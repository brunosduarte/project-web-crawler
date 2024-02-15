// Import necessary types and libraries
import { HierarchyPointNode } from 'd3-hierarchy';

// Define the interface for the JSON data items
export interface SiteMapItem {
  loc: string;
  lastmod: string;
}

// Define the interface for tree nodes
export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

// Function to parse the JSON data into a hierarchical tree structure
export const TreeDataParser = (jsonData: SiteMapItem[]): TreeNode => {
  const root: TreeNode = { name: 'root', children: [] }; // Root node

  jsonData.forEach(item => {
    const paths = item.loc.split('/').filter(Boolean); // Split URL and filter out empty strings
    let current = root; // Start from root

    paths.forEach(path => {
      let child = current.children?.find(c => c.name === path);
      if (!child) {
        child = { name: path, children: [] };
        current.children = [...(current.children || []), child];
      }
      current = child;
    });
  });
  // console.log("root",root)
  return root;
};
