import * as d3 from 'd3'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { useEffect, useRef } from 'react'

import { adaptD3LayoutToPixi } from '@/utils/d3PixiAdapter'

export const Tree = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const app = new PIXI.Application({
      width: 600,
      height: 600,
      backgroundColor: 0xffffff,
      backgroundAlpha: 0,
      resolution: 1000,
      autoDensity: false,
    })

    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view as never)
    }

    const viewport = new Viewport({
      events: app.renderer.events,
      // screenWidth: 800,
      // screenHeight: 600,
      // worldWidth: 1600,
      // worldHeight: 1200,
      // interaction: app.renderer.plugins.interaction,
    })

    app.stage.addChild(viewport)
    viewport.drag().pinch().wheel().decelerate()

    fetch('/src/storage/tree.json')
      .then((response) => response.json())
      .then((data) => {
        const root = d3.hierarchy(data)
        const treeLayout = d3.tree().size([600, 600])
        treeLayout(root)

        adaptD3LayoutToPixi(root as never, viewport)
      })
  }, [])

  return (
    <div
      ref={pixiContainerRef}
      className="flex flex-col justify-center border-2 border-dashed border-gray-600 align-middle"
    ></div>
  )
}
