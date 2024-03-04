// src/components/TreeVisualization/Tree.tsx
import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'; // Ensure this named import is correct
import * as d3 from 'd3';
import { adaptD3LayoutToPixi } from '@/utils/d3PixiAdapter';

export const Tree = () => {
    const pixiContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const app = new PIXI.Application({
            width: 1200,
            height: 600,
            backgroundColor: 0xffffff,
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        if (pixiContainerRef.current) {
          pixiContainerRef.current.appendChild(app.view as any);
        }

        const viewport = new Viewport({
          events: app.renderer.events
          // screenWidth: 800,
          // screenHeight: 600,
          // worldWidth: 1600, // Adjust based on your content size
          // worldHeight: 1200, // Adjust based on your content size
          // interaction: app.renderer.plugins.interaction,
        });

        app.stage.addChild(viewport);
        viewport.drag().pinch().wheel().decelerate();

        fetch('/src/storage/tree.json')
            .then(response => response.json())
            .then(data => {
                const root = d3.hierarchy(data);
                const treeLayout = d3.tree().size([600, 1200]);
                treeLayout(root);

                adaptD3LayoutToPixi(root as any, viewport); // Ensure this function correctly adds content to the viewport
            });
    }, []);

    return <div ref={pixiContainerRef} className="flex flex-col justify-center align-middle border-dashed border-2 border-gray-600"></div>;
};

