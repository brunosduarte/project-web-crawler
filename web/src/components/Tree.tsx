import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from '../storage/data.json';
import { parsedData, SiteMapNode } from '../utils/parsedData';

const domain = 'example.com'
const domainData = data[domain];

export interface TreeProps {
  data: SiteMapNode;
}
const width = 1440;

export const treeCreation = (treeData:any) => {
  const root = d3.hierarchy(treeData);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  const treeLayout = d3.tree<SiteMapNode>().size([0, 0]);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
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
    svg.selectAll('*').remove(); // Clear SVG before redrawing
    
    const treeLayout = d3.tree<SiteMapNode>().size([800, 800]);

    const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 8)
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
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
      .clone(true).lower()
      .attr("stroke", "white");

    // const linkGenerator = d3.linkHorizontal()
    // .x(node => node.y)
    // .y(node => node.x);
        
    // const links = svg.selectAll('path.link')
    // .data(treeLayout(root).links())
    // .enter().append('path')
    // .attr('class', 'link')
    // .attr('d', linkGenerator);
    
  }, [data]);

  // const svg = d3.create("svg")
  //   .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);    
  
  //     

  return <svg ref={svgRef}></svg>;
};

// width="800" height="800"
