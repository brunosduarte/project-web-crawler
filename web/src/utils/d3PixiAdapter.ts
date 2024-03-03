// src/utils/d3PixiAdapter.ts
import * as PIXI from 'pixi.js';
import { HierarchyPointNode, HierarchyPointLink } from 'd3';

export const adaptD3LayoutToPixi = (root: HierarchyPointNode<any>, viewport: PIXI.Container) => {
    const graphics = new PIXI.Graphics();
    viewport.addChild(graphics);

    // Function to draw links
    const drawLink = (link: HierarchyPointLink<any>) => {
        const { source, target } = link;
        graphics.lineStyle(1, 0x223355); // Adjust line style as needed
        graphics.moveTo(source.x, source.y);
        graphics.lineTo(target.x, target.y);

        // Add text label for the link
        const labelText = `${source.data.url}`; // Customize label text as needed
        const text = new PIXI.Text(labelText, {
            fontFamily: 'sans-serif',
            fontSize: 10,
            fill: 0xfff,
            align: 'center',
        });
        text.position.set((source.x + target.x) * 2, (source.y + target.y) * 2);
        viewport.addChild(text);
    };

    // Draw links with labels
    root.links().forEach(drawLink);

    // Draw nodes
    root.descendants().forEach((node) => {
        graphics.beginFill(0x223355);
        graphics.drawCircle(node.x, node.y, 0.05);
        graphics.endFill();
    });
};