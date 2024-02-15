import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface DataProps {
  name: string;
  parent: string;
  link: string;
}

export const MockDataTree = [
  { name: "news", parent: "", link: "Management" },
  { name: "tech", parent: "news", link: "IT" },
  { name: "sport", parent: "news", link: "OK" },
  { name: "music", parent: "news", link: "Hardware" },
  { name: "bob", parent: "music", link: "Hardware" },
  { name: "bsd", parent: "bob", link: "Hardware" },
] as DataProps[];

export const Tree: React.FC<{ data: DataProps[] }> = ({ data }) => {
  const svgRef = useRef(null);
  const graphRef = useRef(null);

  const dims = { height: 600, width: 1440 };

  // tree and stratify
  const stratify = d3
    .stratify<DataProps>()
    .id(d => d.name)
    .parentId(d => d.parent);

  const tree = d3.tree().size([dims.width - 50, dims.height - 50]);

  // create ordinal scales
  const color = d3.scaleOrdinal(["#f4511e", "#e91e63", "#e53935", "#9c27b0"]);

  // init
  useEffect(() => {
    if (svgRef.current !== null) {
      d3.select(svgRef.current)
        .attr("width", dims.width)
        .attr("height", dims.height);

      d3.select(graphRef.current).attr("transform", `translate(${25}, ${25})`);
    }
  }, [svgRef]);

  useEffect(() => {
    //
    const graph = d3.select(graphRef.current);
 
    // remove current nodes and links
    graph.selectAll(".node").remove();
    graph.selectAll(".link").remove();

    // update ordinal scale domain
    color.domain(data.map(d => d.link));

    // get updated root Node data
    const rootNode = stratify(data);
    const treeData = tree(rootNode).descendants();

    // get nodes selection and join data
    const nodes = graph
      .selectAll(".node")
      .data((treeData as any) as d3.HierarchyPointNode<DataProps>[]);

    // get link selection and join new data
    const link = graph.selectAll(".link").data(tree(rootNode).links());

    // enter new links
    link
      .enter()
      .append("path")
      .transition()
      .duration(300)
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2)
      .attr("d", (d3
        .linkVertical()
        .x(d => (d as any).x as number)
        .y(d => (d as any).y as number) as any) as string);

    // create enter node groups
    const enterNodes = nodes
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    // append rects to enter nodes
    enterNodes
      .append("rect")
      // apply the ordinal scale for fill
      .attr("fill", d => color(d.data.link))
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .attr("width", d => d.data.name.length * 20)
      .attr("height", 50)
      .attr("transform", (d, i, n) => {
        let x = d.data.name.length * 10;
        return `translate(${-x}, -25)`;
      });

    enterNodes
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "white")
      .text(d => d.data.name);
  }, [data]);

  return (
    <svg ref={svgRef}>
      <g ref={graphRef} />
    </svg>
  );
};
