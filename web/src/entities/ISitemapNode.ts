export interface ISiteMapNode {
  done: boolean
  url: string
  title: string
  children?: ISiteMapNode[]
}
