import { DataNode, TreeNode } from '../interfaces';

export const parseData = (data: DataNode[]): TreeNode => {
  const root: TreeNode = { name: 'root', children: [] };

  data.forEach(item => {
    const parts = item.loc.split('/').filter(p => p);
    let currentLevel = root; // Start with the root

    parts.forEach((part, i) => {
      const existingPath = currentLevel.children?.find(n => n.name === part);

      if (existingPath) {
        currentLevel = existingPath;
      } else {
        const newPart: TreeNode = { name: part, children: [] };
        currentLevel.children = [...(currentLevel.children || []), newPart];
        currentLevel = newPart;
      }

      // At the last part, add the lastmod as a leaf node
      if (i === parts.length - 1) {
        currentLevel.children = [...(currentLevel.children || []), { name: item.lastmod }];
      }
    });
  });

  return root;
};