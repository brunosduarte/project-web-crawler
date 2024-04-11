import { ISiteMapNode } from './ISitemapNode'

export interface ITreeNode {
  name: string
  url?: string
  title?: string
  done?: boolean
  children: ITreeNode[]
}

export interface ITreeProps {
  dataTree: ISiteMapNode
}
