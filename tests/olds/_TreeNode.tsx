import { Graphics } from '@pixi/react';

export const TreeNode = ({ node }:any) => (
  <Graphics
    draw={(g) => {
      g.clear();
      g.beginFill(0x000000, 1);
      g.drawCircle(node.x, node.y, 5); // Node radius
      g.endFill();
    }}
  />
);
