import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import * as d3 from 'd3';
import { Viewport } from 'pixi-viewport'; // Assuming pixi-viewport is used for zoom & pan

export interface SiteMapNode {
  title: string;
  url: string;
  done: boolean;
  children?: SiteMapNode[];
}

export interface TreeProps {
  tree: SiteMapNode;
}

export const Tree = ({ tree }: TreeProps) => {
  const pixiContainer = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<PIXI.Application | null>(null);

  useEffect(() => {
    if (pixiContainer.current && !app) {
      const newApp = new PIXI.Application({ 
        width: 800, // Example width, adjust as needed
        height: 600, // Example height, adjust as needed
        backgroundColor: 0xffffff, // White background
      });
      pixiContainer.current.appendChild(newApp.view);
      setApp(newApp);

      // Initialize Viewport for zoom and pan functionality
      const viewport = new Viewport({
        screenWidth: 800,
        screenHeight: 600,
        worldWidth: 1000, // Example size, adjust based on layout size
        worldHeight: 1000, // Example size, adjust based on layout size

        interaction: newApp.renderer.plugins.interaction // Use Pixi's interaction plugin
      });

      newApp.stage.addChild(viewport);
      viewport.drag().pinch().wheel().decelerate();

      // Render tree using D3 for layout and Pixi.js for graphics
      renderTree(newApp, viewport, tree);
    }
  }, [pixiContainer, app, tree]);

  const renderTree = (app: PIXI.Application, viewport: Viewport, treeData: SiteMapNode) => {
    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree().size([800, 600]); // Adjust size as needed
    treeLayout(root);

    // Clear previous graphics before rendering new tree
    viewport.removeChildren();

    // Example of rendering nodes, you will need to extend this for links and labels
    root.descendants().forEach((d) => {
      const node = new PIXI.Graphics();
      node.beginFill(0x000000); // Black color for node
      node.drawCircle(0, 0, 5); // Example node as circle
      node.endFill();
      node.x = d.x;
      node.y = d.y;
      viewport.addChild(node);
    });
  };

  return <div ref={pixiContainer} />;
};

export default Tree;
