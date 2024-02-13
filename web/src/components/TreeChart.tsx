import React, {useEffect, useRef} from "react";
import {hierarchy, linkHorizontal, select, tree} from 'd3';
import useResizeObserver from "../hooks/useResizeObserver";

const TreeChart = ({data} : {data: any}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        if (svgRef.current && wrapperRef.current) {
            const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
            const svg = select(svgRef.current).attr(
                "viewBox",
                `-${(width * 1.25 - width) / 2} 0 ${width * 1.25} ${height * 1.25}`
            );

            const root = hierarchy(data);
            const treeLayout = tree().size([height * 1.25, width]);
            const linkGenerator = linkHorizontal().x((link:any) => link.y).y((link:any) => link.x)
            treeLayout(root);

            // nodes
            svg
                .selectAll(".node")
                .data(root.descendants())
                .join(enter => enter.append("circle").attr("opacity", 0))
                .attr("class", "node")
                .attr("cx", (node:any) => node.y) // add padding to the left for the root node
                .attr("cy", (node:any) => node.x)
                .attr("r", 4)
                .transition()
                .duration(500)
                .delay(node => node.depth * 300)
                .attr("opacity", 0.5);

            // links
            svg
                .selectAll(".link")
                .data(root.links())
                .join("path")
                .attr("class", "link")
                // @ts-ignore
                .attr("d", linkGenerator)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", "none")
                .attr("opacity", 0.5);

            // labels
            svg
                .selectAll(".label")
                .data(root.descendants())
                .join(enter => enter.append("text").attr("opacity", 0))
                .attr("class", "label")
                .attr("x", (node:any) => node.y - 5)
                .attr("y", (node:any) => node.x)
                .attr("text-anchor", "end")
                .attr("font-size", 12)
                .text(node => node.data.name)
                .transition()
                .duration(500)
                .delay(node => node.depth * 300)
                .attr("opacity", 1);
        }
    } ,[data, dimensions])

    return(
        <div ref={wrapperRef} className='h-full w-full py-5'>
            <svg ref={svgRef}/>
        </div>
    )
}

export default TreeChart;