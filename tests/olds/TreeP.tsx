import React, { useMemo } from 'react';
import { Stage } from '@pixi/react';
import { calculateTreeLayout } from './_TreeLayout';
import { SiteMapNode } from './Tree';
import { TreeNode } from './_TreeNode';
import { TreeLink } from './_TreeLinks';

interface TreeProps {
  data: SiteMapNode;
}

export const Tree: React.FC<TreeProps> = ({ data }) => {
  console.log(data)
  //const { descendants, links } = useMemo(() => calculateTreeLayout(data));

  return (
    <Stage width={800} height={600} options={{ backgroundColor: 0xffffff }}>
      {descendants.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
      {links.map((link, index) => (
        <TreeLink key={index} link={link} />
      ))}
    </Stage>
  );
};

export default Tree;
