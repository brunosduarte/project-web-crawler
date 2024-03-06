import { useEffect, useRef } from 'react';
import { HierarchyPointNode } from 'd3';
import * as d3 from 'd3';

export interface SiteMapUrl {
  loc: string;
  lastmod: string;
}
export interface SiteMapNode {
  title: string;
  url: string;
  done: boolean;
  children?: SiteMapNode[];
}
export interface TreeProps {
  dataTree: SiteMapNode;
}

export interface CustomHierarchyNode extends d3.HierarchyNode<SiteMapNode> {
  dx: number;
  dy: number;
}

export interface HierarchyPointLink<Datum> {
  source: HierarchyPointNode<Datum>;
  target: HierarchyPointNode<Datum>;
}

export interface NodeData {
  name: string;
  children?: NodeData[];
}

const height = 400;
const width = 400;

const treeCreation = (treeData: any) => {
  const root: CustomHierarchyNode = d3.hierarchy<SiteMapNode>(treeData) as CustomHierarchyNode;
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree<SiteMapNode>().nodeSize([root.dx, root.dy])(root);
};

export function Tree({ dataTree }: TreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  let zoom = d3.zoom()
    .scaleExtent([0.25, 10])
    .on('zoom', handleZoom);

  function handleZoom(e: any){
    e.preventDefault();
    d3.select('svg g')
      .attr('transform', e.transform);
  }

  function zoomIn(e: any) {
    e.preventDefault();
    d3.select('svg')
      .transition()
      .call(zoom.scaleBy as any, 10);
  }

  function zoomOut(e: any) {
    e.preventDefault();
    d3.select('svg')
      .transition()
      .call(zoom.scaleBy as any, 0.5);
  }

  function resetZoom(e: any) {
    e.preventDefault();
    d3.select('svg')
      .transition()
      .call(zoom.scaleTo as any, 1);
  }

  function center(e: any) {
    e.preventDefault();
    d3.select('svg')
      .transition()
      .call(zoom.translateTo as any, 0.5 * width, 0.5 * height);
  }

  function panLeft(e: any) {
    e.preventDefault();
    d3.select('svg')
      .transition()
      .call(zoom.translateBy as any, -50, 0);
  }

  function panRight(e: any) {
    e.preventDefault();
    d3.select('svg')
      .transition()
      .call(zoom.translateBy as any, 50, 0);
  }

  const root = treeCreation(dataTree); 
  
  let x0 = Infinity;
  let x1 = -x0;
  
  useEffect(() => {
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });  
    const height = x1 - x0 + root.x * 2;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);
    svg.selectAll('*').remove();
    
    const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("transform", `translate(${root.y / 2},${root.x - x0})`);
  
    // const link = g.append("g")
    //   .attr("fill", "none")
    //   .attr("stroke", "#555")
    //   .attr("stroke-opacity", 0.4)
    //   .attr("stroke-width", 1.5)
    //   .selectAll("path")
    //   .data(root.links())
    //   .join("path")
    //   .attr("d", (d) => {
    //     const linkGenerator = d3
    //       .linkHorizontal<d3.HierarchyPointLink<NodeData>, [number, number]>()
    //       .source((d) => [d.source.y, d.source.x])
    //       .target((d) => [d.target.y, d.target.x]);
    //     return linkGenerator(d as any);
    //   });

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
      .text(d => d.data.title)
      .clone(true).lower()
      .attr("stroke", "white")
    
  }, [dataTree]);   

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-evenly'>
        <button className="bg-blue-500 text-slate-300 text-xs p-0.5 rounded-lg hover:bg-blue-600 disabled:bg-blue-800" onClick={zoomIn}>Zoom in</button>
        <button className="bg-blue-500 text-slate-300 text-xs p-0.5 rounded-lg hover:bg-blue-600 disabled:bg-blue-800" onClick={zoomOut}>Zoom out</button>
        <button className="bg-blue-500 text-slate-300 text-xs p-0.5 rounded-lg hover:bg-blue-600 disabled:bg-blue-800" onClick={resetZoom}>Reset zoom</button>
        <button className="bg-blue-500 text-slate-300 text-xs p-0.5 rounded-lg hover:bg-blue-600 disabled:bg-blue-800" onClick={panLeft}>Pan left</button>
        <button className="bg-blue-500 text-slate-300 text-xs p-0.5 rounded-lg hover:bg-blue-600 disabled:bg-blue-800" onClick={panRight}>Pan right</button>
        <button className="bg-blue-500 text-slate-300 text-xs p-0.5 rounded-lg hover:bg-blue-600 disabled:bg-blue-800" onClick={center}>Center</button>
      </div>
      <svg ref={svgRef} width={width} height={800} style={{ border: '2px dashed black' }}></svg>
    </div>
  );
};
