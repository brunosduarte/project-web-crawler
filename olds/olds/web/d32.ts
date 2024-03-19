// src/utils/d3PixiAdapter.ts
import * as PIXI from 'pixi.js';
import { HierarchyPointNode, HierarchyPointLink } from 'd3';

export const adaptD3LayoutToPixi = (root: HierarchyPointNode<any>, container: PIXI.Container) => {
    const graphics = new PIXI.Graphics();
    container.addChild(graphics);

    // Function to draw links
    const drawLink = (link: HierarchyPointLink<any>) => {
        const { source, target } = link;
        graphics.lineStyle(2, 0x000000, 1); // Adjust line style as needed
        graphics.moveTo(source.x, source.y);
        graphics.lineTo(target.x, target.y);

        // Add text label for the link
        const midPointX = (source.x + target.x) / 2;
        const midPointY = (source.y + target.y) / 2;
        const labelText = `${source.data.name} to ${target.data.name}`; // Customize label text as needed
        const text = new PIXI.Text(labelText, {
            fontFamily: 'Arial',
            fontSize: 10,
            fill: 0x000000,
            align: 'center',
        });
        text.x = midPointX;
        text.y = midPointY;
        container.addChild(text);
    };

    // Draw links with labels
    root.links().forEach(drawLink);

    // Draw nodes (no changes from previous implementation)
    root.descendants().forEach(node => {
        graphics.beginFill(0x000000); // Adjust fill color as needed
        graphics.drawCircle(node.x, node.y, 0.001); // Adjust circle size as needed
        graphics.endFill();
    });
};




// // src/utils/d3PixiAdapter.ts
// import * as PIXI from 'pixi.js';
// import { HierarchyNode } from 'd3';

// export const adaptD3LayoutToPixi = (root: HierarchyNode<any>, app: PIXI.Application) => {
//     const graphics = new PIXI.Graphics();
//     app.stage.addChild(graphics);

//     // Draw links
//     root.links().forEach(link => {
//         graphics.lineStyle(2, 0x000000, 1);
//         graphics.moveTo(link.source.x, link.source.y);
//         graphics.lineTo(link.target.x, link.target.y);
//     });

//     // Draw nodes
//     root.descendants().forEach(node => {
//         graphics.beginFill(0x000000);
//         graphics.drawCircle(node.x, node.y, 5);
//         graphics.endFill();
//     });
// };








// // src/utils/d3PixiAdapter.ts
// import * as PIXI from 'pixi.js';
// import { HierarchyNode } from 'd3';

// export const adaptD3LayoutToPixi = (root: HierarchyNode<any>, viewport: Viewport) => {
//     const graphics = new PIXI.Graphics();
//     viewport.addChild(graphics);

//     // Draw links
//     root.links().forEach(link => {
//         graphics.lineStyle(2, 0x000000, 1);
//         graphics.moveTo(link.source.x, link.source.y);
//         graphics.lineTo(link.target.x, link.target.y);
//     });

//     // Draw nodes
//     root.descendants().forEach(node => {
//         graphics.beginFill(0x000000);
//         graphics.drawCircle(node.x, node.y, 5);
//         graphics.endFill();
//     });
// };
