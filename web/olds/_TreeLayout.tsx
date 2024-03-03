import * as d3 from 'd3';

export const calculateTreeLayout = ({ data }: any) => {
  const root = d3.hierarchy(data);
  const treeLayout = d3.tree().size([800, 600]);
  return treeLayout(root);
};
