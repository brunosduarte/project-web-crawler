import { Graphics } from "@pixi/react";

export const TreeLink = ({ link }) => (
  <Graphics
    draw={(g) => {
      g.lineStyle(2, 0x999999, 1); // Line width and color
      g.moveTo(link.source.x, link.source.y);
      g.lineTo(link.target.x, link.target.y);
    }}
  />
);
