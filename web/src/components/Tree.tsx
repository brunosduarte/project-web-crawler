import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SiteMapNode } from '../utils/parsedData'
import data from '../storage/data.json';
import { parsedData } from '../utils/parsedData';

const domain = 'example.com'
const domainData = data[domain];

export interface TreeProps {
  data: SiteMapNode;
}
export const treeCreation = (treeData) => {
  const root = d3.hierarchy(treeData);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
};


export const Tree: React.FC<TreeProps> = ({ data }) => {
  const svgRef = useRef(null);
  const processedData = parsedData(domain, domainData);
  //const root = treeCreation(processedData); 

  console.log(processedData);
  useEffect(() => {
    const treeLayout = d3.tree<SiteMapNode>().size([600, 600]);
    const root = d3.hierarchy(data);
    
    const linkGenerator = d3.linkHorizontal()
    .x(node => node.y)
    .y(node => node.x);
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear SVG before redrawing
    
    const links = svg.selectAll('path.link')
    .data(treeLayout(root).links())
    .enter().append('path')
    .attr('class', 'link')
    .attr('d', linkGenerator);
    
    console.log("SVG", links);
    // Add more D3 code here to draw nodes and style the tree
  }, [data]);

  return <svg ref={svgRef} width="600" height="600"></svg>;
};
