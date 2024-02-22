export interface SiteMapUrl {
  loc: string;
  lastmod: string;
}
export interface SiteMapNode {
  name: string;
  children?: SiteMapNode[];
}

export interface TreeProps {
  tree: SiteMapNode;
}

export interface ValueTransformer {
  (value: number): number;
}

export interface CustomHierarchyNode extends d3.HierarchyNode<SiteMapNode> {
  dx: ValueTransformer;
  dy: ValueTransformer;
}

