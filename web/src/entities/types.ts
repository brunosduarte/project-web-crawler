import { ISiteMapNode } from './ISitemapNode'

export interface ISiteMapUrl {
  loc: string
  lastmod: string
}

export interface ICustomHierarchyNode extends d3.HierarchyNode<ISiteMapNode> {
  dx: number
  dy: number
}

export interface INodeData {
  name: string
  children?: INodeData[]
}

export interface ITreeProps {
  dataTree: ISiteMapNode
}

export interface IValueTransformer {
  (value: number): number
}
