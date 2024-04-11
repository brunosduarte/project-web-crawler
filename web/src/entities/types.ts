import { ISiteMapNode } from './ISitemapNode'

export interface ICustomHierarchyNode extends d3.HierarchyNode<ISiteMapNode> {
  dx: number
  dy: number
}

export interface INodeData {
  name: string
  children?: INodeData[]
}

export interface IValueTransformer {
  (value: number): number
}
