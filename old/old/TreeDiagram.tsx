import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { TreeNode } from '../types/TreeNode';
import { parseData } from '../utils/parseData';
import { DataNode } from '../types/DataNode';

export const TreeDiagram: React.FC<{ data: DataNode[] }> = ({ data }) => {
  const [treeData, setTreeData] = useState<TreeNode>();

  useEffect(() => {
    if (data) {
      const parsedData = parseData(data);
      setTreeData(parsedData);
    }
  }, [data]);

  useEffect(() => {
    if (treeData) {
      const root = d3.hierarchy(treeData);
      const treeLayout = d3.tree().size([400, 200]);
      const tree = treeLayout(root);

      // Selection for the nodes
      const nodes = d3.select('svg').selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

      nodes.append('circle').attr('r', 5).style('fill', '#69b3a2');

      nodes.append('text')
        .attr('dy', 4)
        .attr('x', d => d.children ? -8 : 8)
        .style('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name);

      // Selection for the links
      d3.select('svg').selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x)
        )
        .style('fill', 'none')
        .attr('stroke', '#ccc');
    }
  }, [treeData]);
  console.log(treeData);
  return treeData;
  // return <svg width="800" height="600"></svg>;
};



// import React, { useEffect, useState } from 'react';
// import * as d3 from 'd3';
// import { hierarchy, tree } from 'd3-hierarchy';

// interface TreeNode {
//   name: string;
//   children?: TreeNode[];
// }

// export const TreeDiagram: React.FC = () => {
//   const [data, setData] = useState<TreeNode | null>(null);

//   useEffect(() => {
//     // Load and parse the data here
//     const loadData = async () => {
//       const response = await fetch('./storage/data.json');
//       const jsonData: TreeNode = await response.json();
//       setData(jsonData);
//     };

//     loadData();
//   }, []);

//   const drawTree = (data: TreeNode) => {
//     if (!data) return null;

//     // Set dimensions and margins for the diagram
//     const margin = { top: 20, right: 90, bottom: 30, left: 90 };
//     const width = 960 - margin.left - margin.right;
//     const height = 500 - margin.top - margin.bottom;

//     // Create the hierarchical data structure for D3
//     const root = hierarchy(data);
//     const treeLayout = tree<TreeNode>().size([height, width]);
//     treeLayout(root);

//     // Compute the new tree layout
//     const nodes = root.descendants();
//     const links = root.links();

//     // Nodes and links drawing logic goes here
//     // Use D3 to calculate positions and React to render SVG elements
//   };

//   return (
//     <svg width="960" height="500">
//       {data && drawTree(data)}
//     </svg>
//   );
// };

