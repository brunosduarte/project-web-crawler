/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

import { ISiteMapNode } from '@/entities/ISitemapNode'

interface ITreeProps {
  dataTree: ISiteMapNode
}

export function Tree({ dataTree }: ITreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const width = canvas.width
    const height = canvas.height

    const treeLayout = d3.tree().size([height, width]).nodeSize([30, 500])

    const root = d3.hierarchy(dataTree, (d) => d.children)
    treeLayout(root as any)

    const zoomBehavior: d3.ZoomBehavior<any, any> = d3
      .zoom()
      .scaleExtent([0.001, 5])
      .on('zoom', (event) => {
        context.save()
        context.clearRect(0, 0, width, height)
        context.translate(event.transform.x, event.transform.y)
        context.scale(event.transform.k, event.transform.k)
        drawTree(context, root)
        context.restore()
      })

    d3.select(canvas).call(zoomBehavior)
  }, [dataTree])

  function handleResetView() {
    const canvas: any = canvasRef.current
    const context = canvas?.getContext('2d')
    if (context) {
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas?.width, canvas?.height)
      drawTree(context, d3.hierarchy(dataTree))
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center">
        <p className="text-xs text-gray-500">
          Click inside the dashed area, zoom in and drag to view in detail
        </p>
        <button
          className="border-1 rounded-md bg-slate-400 p-1 text-xs text-white"
          onClick={handleResetView}
        >
          Reset View
        </button>
      </div>
      <canvas
        className="border border-dashed border-gray-700"
        ref={canvasRef}
        width={window.innerWidth - 20}
        height={window.innerHeight - 390}
      />
    </div>
  )
}

function drawTree(context: any, root: any) {
  const linkGenerator = d3
    .linkHorizontal()
    .x((d: any) => d.y)
    .y((d: any) => d.x)

  context.beginPath()
  root.links().forEach((link: any) => {
    context.moveTo(link.source.y, link.source.x)
    context.lineTo(link.target.y, link.target.x)
  })
  context.strokeStyle = '#d8d5af'
  context.stroke()

  root.descendants().forEach((d: any) => {
    context.beginPath()
    context.arc(d.y, d.x, 5, 0, 2 * Math.PI)
    context.fillStyle = d.children ? '#558' : '#999'
    context.fill()
    context.strokeStyle = '#fff'
    context.stroke()
  })

  context.fillStyle = '#999'
  context.textAlign = 'start'
  context.textBaseline = 'middle'
  context.font = '12px Arial'
  root.descendants().forEach((d: any) => {
    context.fillText(d.children ? d.data.url : d.data.title, d.y + 8, d.x)
  })
}
