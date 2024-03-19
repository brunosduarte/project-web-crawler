/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HierarchyPointNode } from 'd3'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

export interface SiteMapUrl {
  loc: string
  lastmod: string
}
export interface SiteMapNode {
  title: string
  url: string
  done: boolean
  children?: SiteMapNode[] | never
}
export interface TreeProps {
  dataTree: SiteMapNode
}

export interface CustomHierarchyNode extends d3.HierarchyNode<SiteMapNode> {
  dx: number
  dy: number
}

export interface HierarchyPointLink<Datum> {
  source: HierarchyPointNode<Datum>
  target: HierarchyPointNode<Datum>
}

export interface NodeData {
  name: string
  children?: NodeData[]
}

const height = 500
const width = 1800

const treeCreation = (treeData: SiteMapNode) => {
  const root: CustomHierarchyNode = d3.hierarchy<SiteMapNode>(
    treeData,
  ) as CustomHierarchyNode
  root.dx = 50
  root.dy = width
  return d3.tree<SiteMapNode>().nodeSize([root.dx, root.dy])(root)
}

export function Tree({ dataTree }: TreeProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([0.5, 200])
      .on('zoom', (event) => {
        svg.select('g').attr('transform', event.transform)
      })

    svg.call(zoomBehavior as any)
  }, [])

  const root = treeCreation(dataTree)

  let x0 = Infinity
  let x1 = -x0

  useEffect(() => {
    root.each((d) => {
      if (d.x > x1) x1 = d.x
      if (d.x < x0) x0 = d.x
    })
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', [50, 50, width, x1 - x0 + root.x * 10])
    svg.selectAll('*').remove()

    const g = svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${root.y / 2},${root.x - x0})`)

    const link = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#fffaaa')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('d', (d) => {
        const linkGenerator = d3
          .linkHorizontal<d3.HierarchyPointLink<NodeData>, [number, number]>()
          .source((d) => [d.source.y, d.source.x])
          .target((d) => [d.target.y, d.target.x])
        return linkGenerator(d as any)
      })

    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 1)
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', (d) => `translate(${d.y},${d.x})`)

    node
      .append('circle')
      .attr('fill', (d) => (d.children ? '#555' : '#999'))
      .attr('r', 1)

    node
      .append('text')
      .attr('dy', '1rem')
      .attr('x', (d) => (d.children ? -5 : 5))
      .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d) => d.data.url)
      .clone(true)
      .lower()
      .attr('stroke', 'white')
  }, [dataTree])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ border: '2px dashed gray' }}
    ></svg>
  )
}
