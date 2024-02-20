import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from '../storage/data.json';
import { parsedData, SiteMapNode } from '../utils/parsedData';

const domain = 'enki.com'
const domainData = data[domain] as { loc: string; lastmod: string; }[]; // Update the type of domainData

export interface TreeProps {
  data: SiteMapNode;
}

const width = 1440;

interface CustomHierarchyNode extends d3.HierarchyNode<SiteMapNode> {
  dx: number;
  dy: number;
}

export const treeCreation = (treeData: any) => {
  const root: CustomHierarchyNode = d3.hierarchy<SiteMapNode>(treeData) as CustomHierarchyNode;
  root.dx = 10;
  root.dy = width / (root.height + 1);
  const treeLayout = d3.tree<SiteMapNode>().size([0, 0]);
  return d3.tree<SiteMapNode>().nodeSize([root.dx, root.dy])(root);
};

export const Tree: React.FC<TreeProps> = ({ data }) => {
  const svgRef = useRef(null);
  
  const processedData = parsedData(domain, domainData);
  const root = treeCreation(processedData); 
  console.log('processedData',processedData);

  let x0 = Infinity;
  let x1 = -x0;
  
  useEffect(() => {
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });  
    
    const svg = d3.select(svgRef.current)
       .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);
    svg.selectAll('*').remove();
    
    const treeLayout = d3.tree<SiteMapNode>().size([800, 800]);

    const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);
  
    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)); 

    const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);
  
    node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);    
    
    node.append("text")
      .attr("dy", "0.31rem")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
      .clone(true).lower()
      .attr("stroke", "white")
    
  }, [data]);

  // const svg = d3.create("svg")
  //   .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);    
  
  //     

  return <svg ref={svgRef}></svg>;
};

// width="800" height="800"
