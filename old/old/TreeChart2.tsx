import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'
import { createTreeData } from '../utils/createTreeData';
import data from '../storage/data.json';

export const TreeChart: React.FC = () => {
  const [treeData, setTreeData] = useState(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Load and parse data
    const parsedData = createTreeData(data); // Assuming 'data' is your JSON data
    setTreeData(parsedData);

    // D3 tree layout setup
    const root = d3.hierarchy(parsedData);
    const treeLayout = d3.tree().size([height, width]);
    treeLayout(root);

    // SVG rendering logic
    const svg = d3.select(svgRef.current);
    // Clear previous SVG contents
    svg.selectAll("*").remove();

    // Render links (paths)
    svg.selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr('d', d3.linkHorizontal())
      .style('fill', 'none')
      .style('stroke', '#ccc');

    // Render nodes (circles)
    svg.selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('r', 5)
      .style('fill', '#555');

    // Add more SVG rendering logic as needed
  }, [treeData]);

  return <svg ref={svgRef} width={800} height={600} />;
};

export default TreeChart;
