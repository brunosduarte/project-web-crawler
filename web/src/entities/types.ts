export interface SiteMapUrl {
  loc: string;
  lastmod: string;
}
export interface ISiteMapNode {
  name: string;
  children?: ISiteMapNode[];
}

export interface ITreeProps {
  tree: ISiteMapNode;
}

export interface IValueTransformer {
  (value: number): number;
}

export interface ICustomHierarchyNode extends d3.HierarchyNode<ISiteMapNode> {
  dx: IValueTransformer;
  dy: IValueTransformer;
}

