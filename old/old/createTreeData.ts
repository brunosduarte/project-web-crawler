export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const domain = "example.com"

export const createTreeData = (data: { loc: string }[]): TreeNode => {
  const root: TreeNode = { name: domain, children: [] };

  data.forEach(item => {
    const parts = item.loc.replace(/^https?:\/\/[^\/]+\//, '').split('/');
    let currentLevel = root; // Start from the root

    parts.forEach(part => {
      // Look for existing node at the current level with the same name
      let existingNode = currentLevel.children?.find(n => n.name === part);

      if (existingNode) {
        // If the node exists, move to that node
        currentLevel = existingNode;
      } else {
        // If the node doesn't exist, create a new one and move to it
        const newNode: TreeNode = { name: part };
        if (!currentLevel.children) {
          currentLevel.children = [];
        }
        currentLevel.children.push(newNode);
        currentLevel = newNode;
      }
    });
  });

  return root;
};
