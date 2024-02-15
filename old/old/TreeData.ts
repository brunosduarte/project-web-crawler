interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export const parseData = (data: { loc: string }[]): TreeNode => {
  const root: TreeNode = { name: "root" };

  data.forEach(({ loc }) => {
    const parts = loc.replace(/https?:\/\/|www\./g, '').split('/').filter(Boolean);
    let current = root;

    parts.forEach(part => {
      let node = current.children?.find(n => n.name === part);
      if (!node) {
        node = { name: part };
        current.children = [...(current.children || []), node];
      }
      current = node;
    });
  });

  return root;
};
