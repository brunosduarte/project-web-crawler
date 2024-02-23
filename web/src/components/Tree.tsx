import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface SiteMapUrl {
  loc: string;
  lastmod: string;
}
export interface SiteMapNode {
  name: string;
  children?: SiteMapNode[];
}
export interface TreeProps {
  tree: SiteMapNode;
}

export interface CustomHierarchyNode extends d3.HierarchyNode<SiteMapNode> {
  dx: number;
  dy: number;
}

const width = 1000;

const treeCreation = (treeData: any) => {
  const root: CustomHierarchyNode = d3.hierarchy<SiteMapNode>(treeData) as CustomHierarchyNode;
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree<SiteMapNode>().nodeSize([root.dx, root.dy])(root);
};

export function Tree({ tree }: TreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const zoomBehavior = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        svg.select('g').attr('transform', event.transform);
      });

    svg.call(zoomBehavior as any);
  }, []);
  
  const root = treeCreation(tree); 
  
  let x0 = Infinity;
  let x1 = -x0;
  
  useEffect(() => {
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });  
    
    const svg = d3.select(svgRef.current)
       .attr("viewBox", [0, 0, width, x1 - x0 + root.x * 2]);
    svg.selectAll('*').remove();
    
    const treeLayout = d3.tree<SiteMapNode>().size();

    const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("transform", `translate(${root.y / 2},${root.x - x0})`);
  
    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x) as any); 

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
    
  }, [tree]);   

  return <svg ref={svgRef} width={width} height={400} style={{ border: '2px dashed black' }}></svg>;
};
